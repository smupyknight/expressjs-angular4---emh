
module.exports = function(mongoose, connection) {

	var buyerSchema = mongoose.Schema({
		customer_group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CustomerGroup'
		},
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		telephone: {
			type: String,
			required: true
		},
		fax: String,
		password: {
			type: String,
			required: true
		},
		confirm_password: {
			type: String,
			required: true
		},
		newsletter: Boolean,
		status: {
			type: Number
		},
		approved: {
			type: Boolean
		},
		safe:{
			type: Boolean
		},
		addresses: [ {
			first_name: {
				type: String,
				required: true
			},
			last_name: {
				type: String,
				required: true
			},
			company: String,
			address1: {
				type: String,
				required: true
			},
			address2: String,
			city: {
				type: String,
				required: true
			},
			postcode: String,
			country: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Country',
				required: true
			},
			region_state: {
				type: String,
				required: true
			},
			default_address: Boolean
		} ],
		newsletter_subscription: Boolean
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});

	return connection.model('Buyer', buyerSchema);
}