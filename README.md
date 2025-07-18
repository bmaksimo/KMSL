This is the Playwright project for job aplication.

After inspecting https://kmslh.com/ I choose 2 tests to document and automate. 
Since the site is branching, there are more than few links, so I see the site navigation as the potentially weak point. That is why I choose my first test to chack one of (meny) roads that could be taken. In addition I checked if search box is working.

Test no. 1 
Check the Knowledge Center Link and Make Sure That Search box is working

Prereqisites: -

Steps:

1. Open the web browser and navigete to the homepage https://kmslh.com/ 
2. If "Consent" window appear, click on "Accept All" button.
3. Hover over the "Knowledge Center" link.
4. When the drop-down menu appears, click on the "News" submenu link.
5. Check if browser landed on https://kmslh.com/news/
6. Find the search box "Search any topic" and type in a word that appears in some of the news listed below (for example "leader").
7. Check if there are relevant search results.

Expected result:

There is at least one result listed that has the searched word in a heading ("leader").

Automated test is in the knowldgeCenterTest.spec.js file
---------------------------------------------------------------------------------
Second test checks the ROI calculator. This is a good candidate for complete E2E test. If the math on the backend side could be checked, this will turn this test to the managers' favorite kind.

Test no. 2

Prereqisites: -

Steps:

1. Open the web browser and navigete to the homepage https://kmslh.com/
2. If "Consent" window appear, click on "Accept All" button.
3. Hover over the "Knowledge Center" link.
4. When the drop-down menu appears, click on the "ROI Calculator" submenu link.
5. Fill the ROI Calculator form with test data.
number of employees = 100
employee salary = 50 000
number of agents = 25
agent salary = 9600
number of new agents = 5
onboarding time weeks = 4
ongoing training days = 100
error rate percentage = 3
 
6.  Verifies that the calculation results are displayed and match expected values.

Expected result:

employee knowledge = $41,902
onboarding training = 1,846
ongoing training = $358,904
error rate = $1,800
total = $404,452

Automated test is in the ROICalcTest.spec.js file
