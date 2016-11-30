package org.entcore.admin.services.impl;
import org.entcore.admin.services.AdminService;
import org.entcore.common.neo4j.Neo4j;
import org.entcore.common.neo4j.Neo4jResult;
import org.vertx.java.core.Handler;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;

import fr.wseduc.webutils.Either;

public class AdminNeoService implements AdminService {

	private final Neo4j neo = Neo4j.getInstance();

	@Override
	public void quickSearchUsers(String structureId, String input, Handler<Either<String, JsonArray>> handler) {
		String query =
			"MATCH (u:User)-[:IN]->(g:Group)-[:DEPENDS]->(s:Structure) " +
			"WHERE s.id = {id} " +
			"AND u.displayNameSearchField CONTAINS {input} " +
			"RETURN distinct u.id as id, u.firstName as firstName, u.lastName as lastName " +
			"ORDER BY u.lastName " +
			"LIMIT 5";
		JsonObject params = new JsonObject()
				.putString("id", structureId)
				.putString("input", input);
		neo.execute(query, params, Neo4jResult.validResultHandler(handler));
	}

}
