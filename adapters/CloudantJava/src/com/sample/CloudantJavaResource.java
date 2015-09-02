/*
 *    Licensed Materials - Property of IBM
 *    5725-I43 (C) Copyright IBM Corp. 2015. All Rights Reserved.
 *    US Government Users Restricted Rights - Use, duplication or
 *    disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

package com.sample;

import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.lightcouch.NoDocumentException;

import com.cloudant.client.api.CloudantClient;
import com.cloudant.client.api.Database;
import com.worklight.adapters.rest.api.WLServerAPI;
import com.worklight.adapters.rest.api.WLServerAPIProvider;
import com.worklight.server.bundle.api.WorklightConfiguration;

@Path("/")
public class CloudantJavaResource {
	/*
	 * For more info on JAX-RS see https://jsr311.java.net/nonav/releases/1.1/index.html
	 */
		
	//Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(CloudantJavaResource.class.getName());

    //Define the server api to be able to perform server operations
    WLServerAPI api = WLServerAPIProvider.getWLServerAPI();

	protected static final String CLOUDANT_DB = "test";

	private static CloudantClient cloudant;
	private static Database db;
	
	public static void init() {
		String cloudantDomain = WorklightConfiguration.getInstance().getStringProperty("cloudant.domain");
		String cloudantKey = WorklightConfiguration.getInstance().getStringProperty("cloudant.key");
		String cloudantPassword = WorklightConfiguration.getInstance().getStringProperty("cloudant.password");
		logger.info("cloudantDomain" + cloudantDomain);
		logger.info("cloudantKey" + cloudantKey);
		logger.info("cloudantPassword" + cloudantPassword);

		cloudant = new CloudantClient(cloudantDomain,cloudantKey,cloudantPassword);
		db = cloudant.database(CLOUDANT_DB, false);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addEntry(User user){
		db.save(user);
		return Response.ok().build();
	}
	
	@DELETE
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteEntry(@PathParam("id") String id, User user){
		if(user!=null && user.get_id()!=null && user.get_rev()!=null && id.equals(user.get_id())){
			try{
				db.remove(user);
				return Response.ok().build();
			}
			catch(NoDocumentException e){
				return Response.status(404).build();
			}
			
		}
		else{
			return Response.status(404).build();
		}
	}
	
	@GET
	@Produces("application/json")
	public Response getAllEntries(){
		List<User> entries = db.view("_all_docs").includeDocs(true).query(User.class);
		return Response.ok(entries).build();
	}
}
