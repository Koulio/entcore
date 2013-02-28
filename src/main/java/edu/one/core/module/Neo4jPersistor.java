package edu.one.core.module;

import java.util.Map;
import org.neo4j.cypher.SyntaxException;
import org.neo4j.cypher.javacompat.ExecutionEngine;
import org.neo4j.cypher.javacompat.ExecutionResult;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.neo4j.graphdb.factory.GraphDatabaseSettings;
import org.vertx.java.busmods.BusModBase;
import org.vertx.java.core.AsyncResult;
import org.vertx.java.core.AsyncResultHandler;
import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.json.JsonObject;


public class Neo4jPersistor extends BusModBase implements Handler<Message<JsonObject>> {

	private GraphDatabaseService gdb;
	ExecutionEngine engine;

	// TODO : write a config loader that merge standard conf with mode (dev,test,prod)) conf
	@Override
	public void start() {
		super.start();
		config.mergeIn(config.getObject(config.getString("mode")));
		gdb = new GraphDatabaseFactory()
				.newEmbeddedDatabaseBuilder(config.getString("datastore-path"))
				.setConfig(GraphDatabaseSettings.node_keys_indexable, config.getString("node_keys_indexable"))
				.setConfig(GraphDatabaseSettings.node_auto_indexing, config.getString("node_auto_indexing"))
				.newGraphDatabase();

		engine = new ExecutionEngine(gdb);
		eb.registerHandler(config.getString("address"),this, new AsyncResultHandler<Void>() {
			public void handle(AsyncResult<Void> event) {
				eb.publish(config.getString("start-address"), "start");
			}
		});
		logger.info("Neo4jPertistor _BusModeBase_ started");
	}

	@Override
	public void stop() throws Exception {
		super.stop();
		if (gdb != null) 
			gdb.shutdown();
	}

	@Override
	public void handle(Message<JsonObject> m) {
		String action = m.body.getString("action");
		switch(action) {
			case "execute" :
				execute(m);
				break;
			default :
				sendError(m, "Invalid or missing action");
		}
	}

	private void execute (Message<JsonObject> m) {
		ExecutionResult result = null;
		try {
			logger.info("QUERY " + m.body.getString("query"));
			result = engine.execute(m.body.getString("query"));
		} catch (SyntaxException e) {
			sendError(m, "SyntaxException");
		}
		m.reply(new JsonObject().putObject("result", toJson(result)));
	}

	private JsonObject toJson (ExecutionResult result) {
		JsonObject json = new JsonObject();
		logger.info("jsonO " + result);
		// TODO avoid "if null programming"
		if (result == null) {
			logger.info("result == null");
			return json;
		}
		for (Map<String, Object> row : result) {
			for (Map.Entry<String, Object> column : row.entrySet()) {
				json.putString(column.getKey(), column.getValue().toString());
			}
		}
		return json;
	}
}