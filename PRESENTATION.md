This is a step-by-step description of how this task was approached:
1) The assignment repository was cloned using the `--bare` tag. It has been the first time for me working with `--bare` repositories, so I got to learn about transforming them into working-tree directory to be able to commit my changes.  
2) I set up my machine, updating my Node.js and Playwright, after which I ran an example test using Playwright's default test data/config. Surprisingly, the configuration took at least an hour before the first tests started passing.
3) I performed manual exploratory testing to make sure that I understand the expected behavior of the frontend app: <br/> 
3.1) I created questions to learn whether it's acceptable to omit either a question or an answer and also to see which input types the forms accept. <br/>
3.2) I opened and deleted questions to see how the app behaves. <br/>
3.3) I outlined possible test cases based on the time limit (I wanted to spend not much more than 5 hours on the assignment) and my skill level.

<b> A note on test cases: <br/> </b>
Here is the explanation for the tests that I have covered and the ones that I haven't covered due to time constrains: <br/>

Question card sorting: <br/>
Due to the time limit, the tests for card sorting were not introduced, as I hadn't worked with sorting in JS/TS before (will take time to learn after the assignment is done!). Imagining that I were working in a real-time situation where urgent testing within a strict deadline was required, testing the sorting wouldn't be a priority as it is less likely to decrease the level of users' satisfaction compared to, for instance, the question creation function.

Security: <br/>
I have created a test to check whether forms can only be populated with strings as the divs ('plaintext-only') suggest. Currently, the app seems to turn malicious scripts and html elements into strings and accept them, so I checked for that and not for an error message.

Performance: <br/>
I intended to write simple performance tests to check page loading time using ScriptDuration/TaskDuration, but wasn't successful as it required more learning time than I could have (again, something to master after I finish the assignment).

Parallel execution: <br/>
To ensure that tests can continue running even if one of them fails, I introduced

Reporting: <br/>
To improve reporting, I have added a video configuration that records a test run but only keeps a video recording of 
it if the test fails (see playwright.config.ts > 'use' > 'video'). I have opted for video recording rather than 
screenshots because they seem more informative. However, I have added a simple test for screenshot generation that will fail on the first run and will generate a screenshot for every subsequent run.

Thank you for the opportunity to work on such an interesting task! I wish I had a little more time to really ace this. I feel that I have learned a lot about Playwright and will get to know it better in the upcoming days to add it to my QA toolbox :) </br>
Looking forward to discussing this test task with you!

