import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.pubg.com/shards/pc-eu/',
	headers: {
		'Accept': 'application/vnd.api+json',
		'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3NWQ5NjIwMC1hNmZiLTAxMzYtNjMwNy03ZmY0ZTU1YTc2M2IiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTM4MzI0NzY4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii00YmUwYmFhNi03YzdkLTQ1ZDUtOWUzYS00NzQ3Y2Q0NmI0MzYifQ.7WPC-8T-VK5GNTmhIWoSpQ0otONstGMq5YnMun42eTc'
	}
});

export default instance;