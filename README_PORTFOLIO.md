# Mudassar Hayat - Professional Portfolio

A modern, fully animated, and responsive portfolio website built with Next.js 16, React, and Tailwind CSS. Features dark/light mode, smooth animations, and a professional design.

## 🎨 Features

- **Dark/Light Mode**: Fully functional theme switcher with persistent preferences
- **Fully Responsive**: Mobile-first design supporting all screen sizes (320px - 4K)
- **Smooth Animations**: Fade-in, slide-in, float, and glow animations throughout
- **Modern Design**: Glass-morphism effects, gradient text, and professional styling
- **Fast Performance**: Optimized images, lazy loading, and efficient CSS
- **SEO Optimized**: Proper metadata and structured HTML
- **Accessible**: ARIA labels, semantic HTML, and keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone or download the project
cd your-project-directory

# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📝 How to Customize

### 1. Update Your Information

**Hero Section** (`components/hero-section.tsx`):
- Change the description text
- Update statistics (Years, Projects, Clients)

**About Section** (`components/about-section.tsx`):
- Update personal introduction
- Modify skills in each category
- Change profile image

**Contact Section** (`components/contact-section.tsx`):
- Email is already set to: `imudassarhayat@gmail.com`
- Phone is already set to: `+92 312 1560289`
- Update social media links (GitHub, LinkedIn, Twitter)

### 2. Update Projects

Edit `components/projects-section.tsx`:

```javascript
const projects = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Your project description',
    category: 'Web Apps', // or 'Mobile Apps'
    image: '/your-image.jpg', // Place images in /public folder
    tags: ['Tech1', 'Tech2', 'Tech3'],
    links: {
      live: 'https://your-live-project.com',
      github: 'https://github.com/yourusername/project',
    },
  },
  // ... more projects
]
```

### 3. Add Project Images

1. Place project images in the `/public` folder
2. Update the `image` paths in the projects array
3. Image dimensions: Recommended 800x500px

**For React Native Projects**:
- Take screenshots of your mobile apps
- Add them to the `/public` folder
- Update project entries with proper images

### 4. Update Social Media Links

In `components/contact-section.tsx`, find the social links section and update:

```javascript
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourprofile" ...>
<a href="https://twitter.com/yourhandle" ...>
```

### 5. Change Colors (Optional)

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: oklch(0.205 0 0);      /* Primary color */
  --accent: oklch(0.97 0 0);        /* Accent color */
  /* ... other colors */
}

.dark {
  --primary: oklch(0.985 0 0);      /* Dark mode primary */
  --accent: oklch(0.269 0 0);       /* Dark mode accent */
  /* ... other colors */
}
```

### 6. Update Profile Image

1. Replace `/public/profile.jpg` with your own image
2. Image should be professional (headshot recommended)
3. Recommended size: 800x800px for best quality

## 📱 Responsive Breakpoints

The portfolio is optimized for:
- **Mobile**: 320px - 640px (Single column, hamburger menu)
- **Tablet**: 641px - 1024px (Two columns, horizontal nav)
- **Desktop**: 1025px+ (Three columns, full layout)

All sections automatically adapt to screen size.

## 🎯 Key Sections

### Navbar
- Fixed sticky header with logo and navigation
- Dark/light theme toggle
- Responsive mobile menu
- Smooth scroll animations

### Hero Section
- Welcoming headline with gradient text
- Professional description
- Statistics showcase
- Call-to-action buttons
- Profile image placeholder

### Projects Section
- Filterable project grid
- Category filter (Web Apps, Mobile Apps)
- Hover effects and image zoom
- Technology tags
- Direct links to GitHub and live demos

### About Section
- Personal introduction
- Skills organized by category:
  - Frontend
  - Backend
  - Mobile Development
  - Tools & Platforms

### Contact Section
- Contact information cards
- Email, phone, location
- Contact form with validation
- Social media links
- Success/error feedback

### Footer
- Quick navigation links
- Dynamic copyright year
- Technology credits

## 🛠️ Technologies Used

- **Next.js 16** - React framework with latest features
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Lucide React** - Icon library
- **next-themes** - Dark mode support
- **Vercel Analytics** - Usage tracking

## 📦 Project Structure

```
your-portfolio/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main portfolio page
├── components/
│   ├── navbar.tsx           # Navigation bar
│   ├── hero-section.tsx     # Hero section
│   ├── projects-section.tsx # Projects grid
│   ├── about-section.tsx    # About me section
│   ├── contact-section.tsx  # Contact form
│   ├── footer.tsx           # Footer
│   ├── scroll-to-top.tsx    # Scroll to top button
│   ├── theme-provider.tsx   # Dark mode provider
│   └── ui/                  # Shadcn UI components
├── public/
│   ├── profile.jpg          # Your profile image
│   ├── project-1.jpg        # Project images
│   └── ...
└── package.json
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

Your portfolio will be live in seconds!

### Deploy to Other Platforms

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 Performance Tips

- Images are lazy-loaded by default
- CSS animations use GPU acceleration
- Dark mode switching doesn't require page reload
- Responsive images for different screen sizes
- Minified and optimized code

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)

## 💡 Tips for Success

1. **Keep it Updated**: Add new projects regularly
2. **High-Quality Images**: Use professional-looking screenshots
3. **Consistent Branding**: Maintain a consistent color scheme
4. **Mobile First**: Always test on mobile devices
5. **Fast Loading**: Optimize large images
6. **Regular Backups**: Push changes to GitHub frequently

## 🔒 Privacy & Security

- No data collection (except Vercel Analytics)
- Contact form is simulated (implement backend for emails)
- No sensitive information stored
- HTTPS enabled on Vercel

## ❓ Common Issues

### Images not showing?
- Ensure images are in `/public` folder
- Check file paths are correct
- Use `.jpg` or `.png` format

### Dark mode not working?
- Clear browser cache
- Check if JavaScript is enabled
- Verify theme-provider is in layout.tsx

### Animations not smooth?
- Check browser hardware acceleration is enabled
- Reduce animation duration if needed
- Clear browser cache

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Visit GitHub for similar issues
3. Refer to Next.js/React documentation

## 📄 License

Free to use and modify for your portfolio.

---

**Built with ❤️ by Mudassar Hayat**
