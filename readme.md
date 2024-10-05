# thoughts for this play project

creating some video data display web app in different ways.
eg. vanilla js and html

- with angular
- with react
- with vue
- with svelte

## The app

- display 2 videos
- click a button and play both
- have a graph that displays some data eg, head position with a synchronised vertical line matching part in video

# Notes while doing it

## Vanilla HTML and JavaScript

Started off with just html and javascript. Mostly used copilot prompts to code up the thing. To my surprise, everything was quite straightforward. With just 100 lines of code, we have.

![alt text](html-js.gif)

## Angular version

Started off with giving chat gpt the html file as context and prompted it with `I want to now implement the same functionality in angular. I have angular cli instlled`

Looked promising, but started getting some errors. First I needed to install more things -> plotly angular, importing plotly had to be different.

When that was fixed, I started getting type errors, need to see whats up.

day 2 - tried to fix some type errors and add missing imports, but still problems,
-> try to use the angular-plotly component

trying to create default projects and follow the minimal example, perhaps the server-side rendering support was causing trouble?
-> it was server side rendering where the plotly import failed

jeesh, yeah, the code generated by copilot did not work, video elements undefined. and my brain in debuggin angular, does not get to answers, at least not today
