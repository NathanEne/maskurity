# Maskurity - [nwHacks2021](https://devpost.com/software/maskurity/)
Maskurity is a voice-activated mask detection web app that automates entry into a public indoor space.

Built with the goal of preventing anti-maskers from endangering grocery store employees and customers.

Tech Stack: React, NodeJS, Web Speech API, and Google Cloud AutoML Vision.

## Inspiration
We were inspired by the job of one of our team members. Nathan works at a grocery store in downtown Calgary that is plighted by individuals often walking into the store without a mask on, despite the [bylaw](https://www.calgary.ca/csps/cema/covid19/safety/covid-19-city-of-calgary-mask-bylaw.html) in Calgary, which requires mask use. This causes unnecessary stress for the security guard, as they are responsible for kicking these individuals out after requesting they apply a mask. This distracts the security guard from their main purpose: preventing theft.

Maskurity offers an easily deployable solution to this issue that helps not only save the time of employees, but also keeps everyone safe, employees and shoppers alike.         

## What it does
Maskurity uses any device that has a web browser and camera to take a picture of your face after a voice activated command, which is then sent to our image classifier that will grant or deny access to the building based off the result (with an override for individuals with exemptions). This allows for a hands-free and therefore COVID-safe automation to this issue.  

## Usage
- Voice Commands:
  - open the door
  - I have an exemption
  - clear
