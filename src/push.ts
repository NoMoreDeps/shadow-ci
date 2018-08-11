import Fetch from "node-fetch";



Fetch('https://api.github.com/repos/fskorzec/shadow-flux/statuses/159802f8c188f4d1866c5d7904af18c3e0989db3', {
  method:"POST",
  body: JSON.stringify({
    "state": "success",
    "target_url": "https://example.com/build/status",
    "description": "The build succeeded!",
    "context": "continuous-integration/jenkins"
  })
})
  