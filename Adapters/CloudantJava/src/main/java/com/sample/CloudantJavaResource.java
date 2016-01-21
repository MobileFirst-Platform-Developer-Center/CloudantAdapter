/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package com.sample;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.cloudant.client.api.ClientBuilder;
import com.cloudant.client.api.CloudantClient;
import com.cloudant.client.api.Database;
import com.cloudant.client.org.lightcouch.NoDocumentException;
import com.ibm.mfp.adapter.api.ConfigurationAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;


@Path("/")
public class CloudantJavaResource {
	/*
	 * For more info on JAX-RS see https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */

	//Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(CloudantJavaResource.class.getName());

	protected static final String CLOUDANT_DB = "adapter";

	private static Database db;
	private static String cloudantAccount = "";
	private static String cloudantKey = "";
	private static String cloudantPassword = "";


	@Context
	ConfigurationAPI configurationAPI;



	public Database getDB() {
		if (updatedProperties() || db == null) {
			//cloudant = new CloudantClient(cloudantDomain,cloudantKey,cloudantPassword);
			CloudantClient cloudant = ClientBuilder.account(cloudantAccount)
					.username(cloudantKey)
					.password(cloudantPassword)
					.build();
			db = cloudant.database(CLOUDANT_DB, false);
		}
		return db;
	}

	private boolean updatedProperties() {
		String cloudantAccountOld = cloudantAccount;
		String cloudantKeyOld = cloudantKey;
		String cloudantPasswordOld  = cloudantPassword;

		cloudantAccount = configurationAPI.getPropertyValue("account");
		cloudantKey = configurationAPI.getPropertyValue("key");
		cloudantPassword = configurationAPI.getPropertyValue("password");

		logger.info("cloudantDomain" + cloudantAccount);
		logger.info("cloudantKey" + cloudantKey);
		logger.info("cloudantPassword" + cloudantPassword);

		return !cloudantAccountOld.equals(cloudantAccount) ||
				!cloudantKeyOld.equals(cloudantKey) ||
				!cloudantPasswordOld.equals(cloudantPassword);
	}


	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addEntry(User user){
		if(user!=null && user.isValid()){
			getDB().save(user);
			return Response.ok().build();
		}
		else{
			return Response.status(418).build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteEntry(@PathParam("id") String id, User user){
		if(user!=null && user.get_id()!=null && user.get_rev()!=null && id.equals(user.get_id())){
			try{
				getDB().remove(user);
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
	public Response getAllEntries() throws IOException {
		//List<User> entries = db.view("_all_docs").includeDocs(true).query(User.class);
		List<User> entries = getDB().getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(User.class);
		return Response.ok(entries).build();
	}
}
