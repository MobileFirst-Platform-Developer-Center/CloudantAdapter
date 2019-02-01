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

import io.swagger.annotations.ApiModelProperty;

public class User {
	private String firstName, lastName, company, city, email, notes, _id;

	@ApiModelProperty(hidden=true)
	private String _rev;
	
	private Integer age;
	private Boolean contacted = false;

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String name) {
		this.firstName = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String name) {
		this.lastName = name;
	}
	
	public String getCompany() {
		return company;
	}
	public void setCompany(String name) {
		this.company = name;
	}

	public String getCity() {
		return city;
	}
	public void setCity(String name) {
		this.city = name;
	}

	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Boolean getContacted() {
		return contacted;
	}
	public void setContacted(Boolean contacted) {
		this.contacted = contacted;
	}

	public String getId() {
		return _id;
	}
	public void setId(String _id) {
		this._id = _id;
	}
	
	public String getRev() {
		return _rev;
	}
	public void setRev(String _rev) {
		this._rev = _rev;
	}

	

	/*public boolean isValid(){
		if(age!=null && name!=null && !name.isEmpty()){
			return true;
		}
		else{
			return false;
		}
	}
	*/

}
