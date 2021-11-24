Changes done:

    BackEnd
        - refactored controllers (userController & tripController) to use promise format
        - corrected HTTP methods
        - renamed all 'auth' items to use "user" instead;
        - added tests for userController & tripController
        - added Intgration Test for Login Process
        - Created getFollowers & getFollowing Controllers
        - Created new Routes for getFollowers & geFollowing


    FrontEnd
        - added Discover Section
        - Created Discover Trips list, listed by mosted liked
        - Cleaned up all unused React values
        - Created API Service
        - Fixed Trip Likes & Unlike bug
        - Removed Required profile pic local file (Trip.js line 45)
        - Fixed likes updating
        - Created Followers & Following Pages, Components, Routes, and API
        - Created Front End tests for
                - Unit Tests Login & SignUp
                - Integration Test Login
                - E2E Tests User Adding Trip
        - Broke up App.css into individual component/page css files
        - Home page displays trips only of users the user follows (method can be improved for better scalability)
        - Changed variables named "post" to "trip"
        - Created end-to-end test         



        
        - *** TripPage rename values etc.
        - *** Create Actions/Reducers and bring in state to homepage for 'follows/unfollows'