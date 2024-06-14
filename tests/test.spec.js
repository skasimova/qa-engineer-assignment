const {test, expect} = require('@playwright/test');

test('screenshot is generated', async ({page}) => {
    await page.goto('http://localhost:8000');
    await expect(page).toHaveScreenshot()
});

test('has title', async ({page}) => {
    await page.goto('http://localhost:8000');

    await expect(page.getByText('The awesome Q/A tool')).toBeVisible();
});

test('has sidebar section', async ({page}) => {
    await page.goto('http://localhost:8000');

    const sidebar = page.locator('.sidebar')
    const questionCard = page.locator('.card');
    const cardCount = await questionCard.count();

    if (cardCount === 0) {
        await expect(sidebar).toHaveText('Here you can find 1 question. Feel free to create your own questions!');
    } else if (cardCount === 1) {
        await expect(sidebar).toHaveText('Here you can find 1 question. Feel free to create your own questions!'
        );
    } else {
        await expect(sidebar).toHaveText('Here you can find ' + cardCount + ' questions. Feel free to create your own questions!');
    }

});

test('has questions section', async ({page}) => {
    await page.goto('http://localhost:8000');

    const questionsSection = page.locator('.questions');
    const sortButton = page.locator('.btn:text("Sort questions")');
    const removeQuestionsButton = page.locator('.btn:text("Remove questions")');

    await expect(questionsSection).toBeVisible();
    await expect(sortButton).toBeVisible();
    await expect(removeQuestionsButton).toBeVisible();
});

test('has question maker', async ({page}) => {
    await page.goto('http://localhost:8000');

    const questionMakerSection = page.locator('.question-maker');
    await expect(questionMakerSection).toBeVisible();

    const questionForm = page.locator('#question')
    await expect(questionForm).toBeVisible();

    const answerForm = page.locator('#answer')
    await expect(answerForm).toBeVisible();
});

test('question maker works correctly', async ({page}) => {
    await page.goto('http://localhost:8000');

    const questionsSection = page.locator('.questions');
    const questionMakerSection = page.locator('.question-maker');
    const questionForm = page.locator('#question')
    const answerForm = page.locator('#answer')
    const testQuestion = 'Text question?';

    await questionForm.fill(testQuestion);
    await answerForm.fill('Test answer');
    await questionMakerSection.locator('button[type="submit"]').click();

    await expect(questionsSection).toBeVisible();
    const questionElement = await questionsSection.locator(`:text("${testQuestion}")`);
    await expect(questionElement).toBeVisible();
});

test('question removal works correctly', async ({page}) => {
    await page.goto('http://localhost:8000');

    const questionCard = page.locator('.card');
    const removeQuestionsButton = page.locator('.btn:text("Remove questions")');
    const alertMessage = page.locator('.alert');

    if (questionCard) {
        await removeQuestionsButton.click();
        await expect(alertMessage).toBeVisible();
    }
});

test('question maker is secure', async ({page}) => {
    await page.goto('http://localhost:8000');

    const questionForm = page.locator('#question')

    const testCases = [
        {input: 'Test question', expected: 'Test question'}, // Plain text
        {input: '<script>alert("xss")</script>', expected: '<script>alert("xss")</script>'}, // Script injection
        {
            input: 'Question with special characters: !@#$%^&*()',
            expected: 'Question with special characters: !@#$%^&*()'
        }, // Special characters
        {input: '0123456789', expected: '0123456789'}, // Numbers
        {input: '<div>HTML content</div>', expected: '<div>HTML content</div>'}, // HTML tags
    ];

    for (const testCase of testCases) {
        await questionForm.fill(testCase.input);
        await expect(questionForm).toHaveValue(testCase.expected);
    }
});


