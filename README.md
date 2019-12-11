# OPSS_final_project
Code 201n16 final project

## Description
An interactive page of multiple choice questions that compound to determine the _"personality"_ or _"duck persona"_ of the user. 

## Contributors
- Brett Packard
- Cas Olejniczak
- Madison Stehle
- Thomas Sherer

## Project Management Board
View our work flow [here](https://github.com/OPSS2019/OPSS_final_project/projects).

## Domain Model
- [Domain Model](/assets/DomainModel.jpg)

## Wireframes
- [Index](/assets/wireframeIndex.png)
- [Results](/assets/wireframeResults.png)
- [AboutUs](/assets/wireframeAboutUs.png)

## Quiz Logic
To begin with, we were very unsure how to build the logic behind what the quiz answers mean. Our first thoughts traveled to the most basic of options, increase or decrease a single counter, and each of our results would be associated with specified value ranges. You could spoof this a bit to seem more or less dynamic. Result values that are odd are A, evens are B, add a 'pitfall' question that a certain option always give you a certain (or random) duck, and so on. But beyond those tricks, there's really no dynamics at play.
We came across a couple CodePen examples while investigating other ideas. The first link below prompted the 'x and y' idea after being quickly misread, and the suggestion of the second link below strengthened confidence in the 'x and y' idea. At their most basic, it's the same as the basic idea above with an additional value. I found it translated very well to a graph for visualization. In an xy graph, we have a x-axis and a y-axis, creating quadrants. We can assign a final result to each quadrant, and choose which value(s) will increment or decrement by however much we want for each response. This allows us our first taste of a dynamic quiz logic, achieves our needs, and really opens us up to scale up if we get to that point!
References:
Initial inspiration for 'x and y' idea: https://codepen.io/danubevictoria/pen/WObGGQ
Another inspiration for 'x and y' idea: ...