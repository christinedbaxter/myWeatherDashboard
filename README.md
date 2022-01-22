# myWeatherDashboard

Module 6 Challenge Assignment, Server-Side APIs: Dashboard

# 06 Server-Side APIs: Weather Dashboard

## Table of Contents

[Description](#description) |
[User Story](#user-story) |
[Acceptance Criteria](#acceptance-criteria):
&nbsp;[General](#general),
&nbsp;[Technical](#technical),
&nbsp;[Deployment](#deployment),
&nbsp;[Quality](#quality) |
[Review/Deployment](#reviewdeployment) |
[Usage](#usage) |
[Mock-Up](#mock-up) |
[Credits](#credits) <br />

## Description

Developers are often tasked with retrieving data from another application's API then using that data in the context of their own. This weather dashboard application does just that as it was built using the OpenWeather One Call API. A user can enter a city then retrieve a current and future forecast for that specified city. In addition, the searched cities are persisted using local storage.

This app will run in the browser and feature dynamically updated HTML and CSS powered by JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

[back to top](#table-of-contents)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

[back to top](#table-of-contents)

## Acceptance Criteria

### General

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

[back to top](#table-of-contents)

### Technical

- No errors should be produced in console when inspected using Chrome DevTools.
- Satisfies all of the above acceptance criteria.
- Uses the OpenWeather API to retrieve weather data
- Uses localStorage to store persistent data

[back to top](#table-of-contents)

### Deployment

- Application deployed at live URL.
- Application loads with no errors.
- Application GitHub URL submitted.
- GitHub repository contains application code.

[back to top](#table-of-contents)

### Quality

#### Application

- Application user experience is intuitive and easy to navigate.
- Application user interface style is clean and polished.
- Application resembles the mock-up functionality provided in the Challenge instructions.

#### Repository

- Repository has a unique name.
- Repository follows best practices for file structure and naming conventions.
- Repository follows best practices for class/id naming conventions, indentation, high-quality comments, etc.
- Repository contains multiple descriptive commit messages.
- Repository contains high-quality README file with description, screenshot, and link to deployed application.

[back to top](#table-of-contents)

## Review/Deployment

You are required to submit BOTH of the following for review:

- Deployed Application: &nbsp; [Live URL](https://christinedbaxter.github.io/myWeatherDashboard/)

- GitHub Repository: &nbsp; [GitHub Repository URL](https://github.com/christinedbaxter/myWeatherDashboard)

- GitHub Project: [Link to project](https://github.com/christinedbaxter/myweatherDashboard/projects)

- GitHub Issues: [Link to closed issues](https://github.com/christinedbaxter/myweatherDashboard/issues)

[back to top](#table-of-contents)

## Usage

Travelers will use this application to review weather outlooks for various cities as they plan their next trip. Traveler(s) will run the application's clean and polished user interface within the browser, ensuring responsiveness is built in for adaption to multiple screen sizes.

Please note this website was designed with a mobile-first mindset and uses the following media queries for responsive display on mobile phone and tablet screens:

- Mobile Phones (max-width = 500px)
- Tablets (max-width = 690px)

[back to top](#table-of-contents)

## Mock-Up

The following animation demonstrates the application functionality:

![Demonstration of the Weather Dashboard Challenge.](./assets/images)

[back to top](#table-of-contents)

## Credits

- Module 6: Server-Side APIs Bootcampspot Material
- Module 6: Class Activities

---

© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
