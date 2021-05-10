Format for the messages between backend and frontend
	Every response will have a success: true or success: false  in the root of the json file
	always in lowercase.
	If success: false happens there will be an error: error message where error message
	will be in a format defined for each instance so that React can handle it appropriately.
	
