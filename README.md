# Spotify Alerts Service

A service to periodically check Spotify API for new episodes of selected podcasts, and store the results in a DynamoDB.

When new items are added to the DynamoDB, an email should be sent to specified users, telling them about the details of the new podcast(s).
