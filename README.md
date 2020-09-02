# OPSS_final_project
Code 201n16 final project: 
[What's Your Duck Persona?](https://opss2019.github.io/OPSS_final_project/)

## Description
An interactive page of multiple choice questions that compound to determine the _"personality"_ or _"duck persona"_ of the user. 

## Contributors
- Brett Packard
- Cas Ibrahim
- Madison Stehle
- Thomas Sherer

## Project Management Board
View our work flow [here](https://github.com/OPSS2019/OPSS_final_project/projects).

## Domain Model
- [Domain Model](/assets/dataflow.png)

## Wireframes
- [Index](/assets/wireframeIndex.png)
- [Results](/assets/wireframeResults.png)
- [AboutUs](/assets/wireframeAboutUs.png)

## Resources
- [Google Custom Fonts: Open Sans](https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans)
- [Google Custom Fonts: Bungee](https://fonts.google.com/specimen/Bungee?selection.family=Bungee)
- [Header Duck Image](https://images-na.ssl-images-amazon.com/images/I/31D52aAsX7L.jpg)
- [Vibin' Duck Image](https://images.squarespace-cdn.com/content/v1/5b3533be5417fc1ec0557ea2/1562084771301-SFJAPS46EGVUU82PT913/ke17ZwdGBToddI8pDm48kO5wp5IYarelgW111WaXbNt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hReLB75oIvKxcDxwlnLXaZU6XYRUcoMQDB5NeF8TeSuSEjrHTW2qjRDkvymdPTBWA/ASrubberducky.jpeg)
- [Friduc Kahlo Image](https://www.budducks.com/media/com_eshop/products/resized/Yarto%20Frida-1080x1080.jpg)
- [Chewducca Image](https://www.romeduckstore.it/wp-content/uploads/2019/11/paperella-Chewbecca2-600x600.png)
- [Sherduck Holmes Image](https://images-na.ssl-images-amazon.com/images/I/51HWPOJDhtL._SL1000_.jpg)
- [Stretchy Colorful Duck GIF](http://33.media.tumblr.com/6594ec504f11d61c1c45d4a9c83112db/tumblr_nrchiceMy01u2u368o1_500.gif)
- [Quack GIF](https://media.giphy.com/media/lnnJmf0cY5AnVZaAjR/giphy.gif)
- [Quack GIF Transition Code Inspiration](https://techstacker.com/vanilla-javascript-how-to-check-if-a-class-exists-practical/cXTuMZ2XutfH36SYc)

### WCAG Accessibility Compliance Research:  
**Background/Overview -** (most of this when far beyond the scope of our project, but it helped orient a background understanding of the objectives)
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG
__*For a deeper dive:*__
- https://www.w3.org/WAI/standards-guidelines/wcag/
- https://www.w3.org/WAI/WCAG21/quickref/

**Guidance I settled on (within project scope):**
- https://www.w3schools.com/html/html_accessibility.asp
- https://developer.mozilla.org/en-US/docs/Learn/Accessibility

## Quiz Logic
   To begin with, we were very unsure how to build the logic behind what the quiz answers mean. Our first thoughts traveled to the most basic of options, increase or decrease a single counter, and each of our results would be associated with specified value ranges. You could spoof this a bit to seem more or less dynamic. Result values that are odd are A, evens are B, add a 'pitfall' question that a certain option always give you a certain (or random) duck, and so on. But beyond those tricks, there's really no dynamics at play.
  
   We came across a couple CodePen examples while investigating other ideas. The first link below prompted the 'x and y' idea after being quickly misread, and the suggestion of the second link below strengthened confidence in the 'x and y' idea. At their most basic, it's the same as the basic idea above with an additional value. I found it translated very well to a graph for visualization. In an xy graph, we have a x-axis and a y-axis, creating quadrants. We can assign a final result to each quadrant, and choose which value(s) will increment or decrement by however much we want for each response. This allows us our first taste of a dynamic quiz logic, achieves our needs, and really opens us up to scale up if we get to that point!

### References:
  
- Initial inspiration for 'x and y' idea: https://codepen.io/danubevictoria/pen/WObGGQ
- Another inspiration for 'x and y' idea: https://codepen.io/edubz99/pen/PeRjNb?editors=1010
- A article of recommendations on how to write better quiz questions: https://springhole.net/writing/write-better-personality-quizzes.htm
- Frida Kahlo quote inspiration: https://www.goodreads.com/author/quotes/52760.Frida_Kahlo
