function buildModel(){
	function Mail(){
		this.sentDate = function(){
			return moment(this.sent.$date).calendar();
		}
	}

	function Folder(api){
		this.collection(Mail, {
			sync: function(){
				var that = this;
				http().get(this.api.get).done(function(data){
					that.load(data);
				})
			},
			api: api
		});
	}

	Model.collection(Folder, {
		sync: function(){
			if(this.current === null){
				this.current = this.inbox;
			}

			this.current.mails.sync();
		},
		openInbox: function(){
			this.current = this.inbox;
			this.current.mails.sync();
		},
		openOutbox: function(){
			this.current = this.outbox;
			this.current.mails.sync();
		}
	});

	Model.folders.inbox = new Folder({
		get: '/conversation/public/mocks/inbox.json'
	});
	Model.folders.outbox = new Folder({
		get: '/conversation/public/mocks/outbox.json'
	});
}