// import "server-only";

import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  organization: "org-27u0QhfhY8rWqMDmiUBdRw6E",
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const seedCategory = "Human Resources";

const seedPrompts = `
"Help me create a game where the surface people with powerful solar technology enter into a war with the magical subsurface people. The game will be called The Abyss.",
"Help me debut a minimalist electronic music album focused on digital streaming. I want to call it Super Machina.",
"I want to cultivate coffee scientifically to achieve the most standout flavors and aromas. I also want to have rare, organic additives.",
"I need to create a collection of sales literature related to CommonOS which help us sell to early-stage founders and young tech workers.",
"Help me create a series of email newsletters for the upcoming launch season for my company Common. Common’s primary early market is startups and founders, and the emails should be centered around CommonOS’s automation features.",
"Architect a sustainable, self-sufficient habitat design for a Mars colonization project, optimizing for minimal resource consumption and maximum resilience.",
"Create an immersive virtual reality experience that simulates historical events, focusing on ancient civilizations like the Mayans or Mesopotamians, emphasizing accuracy and educational value.",
"Craft a strategic plan for a non-profit organization dedicated to preserving endangered species, integrating conservation efforts with community engagement and education.",
"Create a comprehensive training module using interactive simulations to educate call center agents on handling escalated customer complaints, focusing on de-escalation techniques and conflict resolution.",
"Implement a post-call survey system that collects detailed feedback from customers, analyzing data to identify trends and areas for call center service improvement."
`;

const seedPromptsMessage = `
I have these example prompts for the ${seedCategory} category which I need you to use as inspiration:
'''
${seedPrompts}
'''

Please provide a list of 10 more prompts for the ${seedCategory} category. 
Provide your answer as a JSON object like this:
{ "prompts": ["prompt 1 with depth and specificity", "prompt 2 with depth and specificity", "prompt 3 with depth and specificity"] }
`;

const slug = seedCategory.toLowerCase().replace(" ", "-");

async function main() {
  console.info("Generating prompts for", seedCategory);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: seedPromptsMessage },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  const contextText = completion.choices[0].message.content;

  if (!contextText) {
    console.log("No context text provided.");
    return;
  }

  const context = JSON.parse(contextText);
  const prompts = context.prompts;

  console.info(prompts);

  // create directory for .mdx files if none exists
  const dir = "app/prompts/" + slug;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // generate .mdx files from prompts
  prompts.forEach((prompt, index) => {
    const shortPrompt = prompt.substring(0, 50);
    const promptSlug = shortPrompt.toLowerCase().replace(/[^a-z0-9]/g, "-");

    // TODO:: create ${dir}/${promptSlug}/ folder if it doesn't exist?

    const filename = `${dir}/${promptSlug}/page.mdx`;

    const content = `---
Prompt:
---
${prompt}
---
Category: ${seedCategory}
`;

    fs.writeFileSync(filename, content);

    console.log(`Generated ${filename}`);
  });
}

main();
