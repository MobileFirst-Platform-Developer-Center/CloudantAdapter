IBM MobileFirst Platform Foundation
===
## CloudantAdapter
An application demonstrating how to use a Java adapter in order to connect to a Cloudant database and perform various actions on user data.

### Tutorials
https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/adapters/cloudant/

### Usage
#### Adapter setup
1. Create a database in Cloudant and generate an API key. Make sure that you provide read and write rights for this key.
2. To connect to Cloudant, update the Cloudant configuration:

   * CloudantJS:
      - Open the adapter XML file and replace the `CLOUDANT_ACCOUNT`, `KEY` and `PASSWORD` placeholders with the actual values.  
      - Open the **CloudantJS-impl.js** file and replace the `DATABASE_NAME` placeholder with your database name.
      - Use either Maven or MobileFirst Developer CLI to [build and deploy the CloudantJS adapter](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/adapters/creating-adapters/).
   
   * CloudantJava:
      - Use either Maven or MobileFirst Developer CLI to [build and deploy the CloudantJava adapter](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/adapters/creating-adapters/).
      - In the **MobileFirst Operations Console → [your adapter] → Configurations tab**, replace the `DATABASE_NAME`, `CLOUDANT_ACCOUNT`, `KEY` and `PASSWORD` placeholders with the actual values.

      > To learn more about the adapter's configurations properties see the [Java Adapters](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/adapters/java-adapters) tutorial.

#### Application setup
1. From a **Command-line**, navigate to the **CloudantAdapterApp** project's root folder.
2. Add a platform using the `cordova platform add` command.
3. Register the application by running the command: `mfpdev app register`.
4. Run the application by running the `cordova run` command.

**NEED TO ADD MISSING INSTRUCTIONS**

### Supported Levels
IBM MobileFirst Platform Foundation 8.0

### License
Copyright 2015 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
