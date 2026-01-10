<div align="center">
  <img src="https://picsum.photos/400/200?random=1" alt="Job Profile Lab Banner" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);">
  <h1 style="font-size: 3.5em; font-weight: 800; background: linear-gradient(45deg, #fbbf24, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-top: 20px; text-shadow: 0 0 8px rgba(255, 165, 0, 0.6), 0 0 16px rgba(255, 165, 0, 0.4);">
    Job Profile Lab
  </h1>
  <p style="font-size: 1.5em; font-weight: 600; color: #fbbf24; max-width: 800px; margin-top: 10px;">
    The Science of Getting Hired.
  </p>
  <p style="font-size: 1.0em; color: #fcd34d; max-width: 700px; margin-top: 5px;">
    by <a href="https://swanlakedigital.com" target="_blank" rel="noopener noreferrer" style="color: #fcd34d; text-decoration: none; font-weight: bold; hover:text-amber-300 transition-colors duration-200">Swan Lake Digital</a>
  </p>
  <p style="font-size: 1.2em; color: #fcd34d; max-width: 700px; margin-top: 10px;">
    The Job Profile Lab is an intelligent tool designed to transform your raw resume into a meticulously crafted, SEO-optimized profile for LinkedIn and beyond. Harnessing the power of advanced AI, it provides tailored content, strategic keywords, and a seamless staging environment for effortless updates.
  </p>
  <p style="margin-top: 30px;">
    <a href="#features" style="background: linear-gradient(45deg, #f97316, #ea580c); padding: 10px 20px; border-radius: 5px; text-decoration: none; color: white; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);">Explore Features</a>
    <a href="#getting-started" style="background: linear-gradient(45deg, #fbbf24, #f59e0b); padding: 10px 20px; border-radius: 5px; text-decoration: none; color: white; font-weight: bold; margin-left: 20px; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);">Get Started</a>
  </p>
</div>

---

## ✨ Vision & Philosophy

In the hyper-connected professional landscape, your digital profile is often your first impression. The Job Profile Lab transcends traditional resume conversion by acting as your personal AI-powered career coach and SEO specialist. We don't just transfer your data; we enhance it, infuse it with trending industry keywords, and present it in a user-friendly staging interface, making your journey to career advancement both intuitive and impactful. This tool is built on a philosophy of empowering professionals with cutting-edge AI, ensuring their profiles resonate with recruiters and opportunities.

---

## 🚀 Features

*   **AI-Powered Optimization**: Leveraging the latest Gemini API, our engine intelligently parses your resume text, identifies your core role, and rewrites your content to include trending buzzwords and high-value search terms specific to your industry for the **modern job market**.
*   **Vibrant Orange & Amber Theme with Glow Effects**: A visually stunning and futuristic design, optimized for readability and aesthetic appeal, featuring dynamic gradients and subtle glow effects.
*   **Intuitive & Mobile-First UI**: Designed with a focus on seamless user experience, prioritizing mobile responsiveness. The elegant and futuristic interface guides you through every step, ensuring core actions are always visible and accessible.
*   **Perpetual Header with Global Actions**: An always-visible header provides quick access to core functionalities. On mobile, actions like "New Optimization", "Download Plan", and "Help" are presented as compact, intuitive icons to maximize screen real estate.
*   **Dedicated Tutorial Page**: A comprehensive, easily accessible guide within the app (triggered by the "Help" button) provides detailed instructions on how to use all features, ensuring users are fully empowered.
*   **Job Site Profile Staging**: A dedicated web view that meticulously mirrors common profile edit fields. Review, refine, and copy optimized content with confidence for platforms like LinkedIn, Indeed, Glassdoor, and similar.
*   **Multiple Headline Options**: Receive 3 distinct, high-impact headlines to choose from, each crafted to capture attention.
*   **Compelling About Section**: A rewritten, first-person narrative for your "About" section, strategically including a "Specialties" keyword block.
*   **Enhanced Experience Descriptions**: Each job entry is optimized with bullet points featuring quantifiable metrics and keyword-rich descriptions for the **current job market**.
*   **Curated Skill Set**: Automatically generates a list of up to 50 top relevant skills for your target role, boosting your profile's searchability and relevance for the **current job market**.
*   **One-Click Copy**: Seamlessly copy any optimized section or individual field to your clipboard with dedicated "COPY TO CLIPBOARD" buttons.
*   **Copy All Optimizations**: A powerful single button to copy **all** optimized profile content (headline, about, experience, skills) at once, ready to be pasted into your preferred word processor or document editor for further customization.
*   **Character Limit Monitoring**: Real-time character counts for every text block, with visual cues to indicate if content exceeds platform limits.
*   **Downloadable Markdown Plan**: Generate a **structured Markdown (.md) file** of your optimized profile data, including all guide tips. This file is ideal for offline reference, can be opened in any text editor, and its structured content makes it easy to copy-paste sections into other applications.
*   **Platform Agnostic Design**: Built with a modular configuration to easily extend support to other platforms like Indeed and Glassdoor in future iterations.

---

## 💻 Technologies

This application is built with a modern, robust tech stack:

*   **Frontend**: React 18+ (with TypeScript)
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google Gemini API (`@google/genai`)
*   **Runtime**: Node.js (for local development & Vercel deployment)
*   **Deployment**: Vercel

---

## 🛠️ Getting Started

Follow these steps to set up and run the Job Profile Lab locally.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Cloud Project with the Gemini API enabled and a valid API Key.

### API Key Configuration

The application requires a Gemini API key. For production deployments (e.g., on Vercel), this key must be configured as an environment variable.

#### Local Development

1.  Create a `.env` file in the root directory of the project.
2.  Add your Gemini API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    *Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.*

#### Vercel Deployment

When deploying to Vercel, you will need to set the `API_KEY` environment variable directly in your Vercel project settings.

1.  Go to your Vercel project dashboard.
2.  Navigate to "Settings" -> "Environment Variables".
3.  Add a new environment variable:
    *   Name: `API_KEY`
    *   Value: Your Gemini API Key
    *   Scope: Production, Preview, Development (recommended for full functionality)

**Important Note on API Keys:**
For local development, the `API_KEY` will be read from your `.env` file. When deployed live, Vercel securely injects the `API_KEY` from your project's environment variables. The application code is written to expect `process.env.API_KEY`, making it compatible with both setups without modification.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.your-username/job-profile-lab.git
    cd job-profile-lab
    ```
    *(Replace `your-username/job-profile-lab.git` with your actual repository URL)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will typically open in your browser at `http://localhost:3000`.

---

## 💡 Usage

1.  **Paste Your Resume**: On the landing page, paste the plain text content of your resume into the provided textarea.
2.  **Optimize Profile**: Click the "Optimize Profile" button. The AI will process your text.
3.  **Review & Stage**: Once optimized, the Job Site Profile Stager interface will appear.
    *   The **"Quick Guide Tip"** at the top of the right column provides contextual advice for the entire optimized profile.
    *   Navigate through the **Job Site Profile Sections** on the left (Header, About, Experience, Skills).
    *   For each section, review the AI-generated content on the right.
    *   Use the character counters to ensure compliance with platform limits.
    *   Click the "COPY TO CLIPBOARD" button next to any individual field to copy its content.
    *   Use the **"COPY ALL OPTIMIZATIONS"** button to copy all generated content at once, ready to be pasted into your favorite document editor.
4.  **Access Tutorial**: Click the "Help" button in the perpetual header to open a dedicated page with detailed instructions and tips about the app.
5.  **Download Plan**: Click the "Download Plan" button in the header to get a **structured Markdown (.md) file** of your optimized profile, including all guide tips. This file is excellent for offline reference and easy copy-pasting into text or word editors (you may need to copy from the browser or a text editor if your word processor doesn't render Markdown directly).
6.  **Update Your Profile**: Go to your job site profile edit page (e.g., LinkedIn) and paste the copied content (either section-by-section or all at once) into the respective fields.

---

## 🛣️ Roadmap & Future Enhancements

*   **Full PDF Generation**: Implement `react-pdf` for a highly formatted, visually appealing PDF export of the optimized profile.
*   **Multi-Platform Support**: Expand `siteConfig.ts` and UI elements to support Indeed, Glassdoor, and other job platforms with their specific field limits and optimization strategies.
*   **User Account Management**: Allow users to save optimized profiles, track changes, and manage multiple resumes.
*   **Direct File Upload**: Enable PDF/DOCX resume uploads (requires backend processing for parsing).
*   **AI Feedback Loop**: Allow users to provide feedback on the AI's suggestions to further refine the optimization engine.
*   **Dark/Light Mode**: User preference for theme.

---

## 🤝 Contributing

We welcome contributions! If you have suggestions, bug reports, or want to contribute code, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

<div align="center" style="margin-top: 50px; font-size: 0.9em; color: #64748b;">
  Created with passion and precision using AI by Swan Lake Digital.
</div>