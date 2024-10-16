'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import PinnedRepos from "@/components/starter-kit/PinnedRepo"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Zap, Package, Layers, Code, Info, Rocket, Home, ChevronUp } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"

// NavLinks array with name, href, and icon for each navigation item
const NavLinks = [
  { name: "Home", href: "#", icon: Home },
  { name: "About", href: "#about", icon: Info },
  { name: "Features", href: "#features", icon: Zap },
  { name: "Get Started", href: "#get-started", icon: Rocket },
  { name: "GitHub", href: "https://github.com/Vishal-Kumar3/starter-kit", icon: GitHubLogoIcon },
]

// Glassy Navigation Component
const GlassyNav = () => {
  return (
    <motion.nav
      className="fixed z-50 left-0 right-0 mx-auto p-4 rounded-full backdrop-blur-lg bg-white/80 border border-gray-200 shadow-lg
                 sm:top-4 sm:max-w-md
                 max-sm:bottom-4 max-sm:w-[calc(100%-2rem)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <ul className="flex justify-around items-center">
        {NavLinks.map((link, index) => (
          <li key={index}>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900" href={link.href}>
                    <link.icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-[0%] z-50"
      style={{ scaleX }}
    />
  )
}

// Scroll to Top Button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <motion.button
      className={`fixed bottom-20 right-4 p-2 rounded-full bg-gray-800 text-white z-50 ${isVisible ? 'block' : 'hidden'}`}
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <ChevronUp className="h-6 w-6" />
    </motion.button>
  )
}

// Interactive Feature Card
const InteractiveFeatureCard = ({ icon: Icon, title, content }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="bg-white border-gray-200 shadow-md cursor-pointer">
        <CardHeader>
          <Icon className="h-8 w-8 mb-2 text-blue-500" />
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          {content}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8ff] text-gray-900">
      <ScrollProgress />
      <GlassyNav />
      <ScrollToTopButton />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Code className="h-16 w-16 mb-4 text-blue-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Next.js Starter Kit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Supercharge Your Next.js Development
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Jump-start your Next.js projects with our feature-rich, customizable starter kit. Build faster, smarter, and with best practices baked in.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
                  <Link href="#get-started">Get Started</Link>
                </Button>
                <Button variant="outline" asChild className="border-gray-300 text-gray-700 hover:bg-gray-100">
                  <Link href="https://github.com/yourusername/your-repo">
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0ff]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Image
                  src="/vishalkumar.jpg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="Your Name"
                  className="w-full max-w-[400px] aspect-square overflow-hidden rounded-xl object-cover"
                />
              </motion.div>
              <div className="flex flex-col flex-1 justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">About the Creator</h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hi, I'm [Your Name]. I'm a passionate developer with a focus on creating efficient and scalable web applications. This Next.js Starter Kit is the result of my experience and best practices I've gathered over the years.
                </p>
                {/* <h3 className="text-2xl font-bold tracking-tighter text-gray-900">My Pinned Repositories</h3>
                <PinnedRepos username="yourusername" /> */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">Key Features</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12"
            >
              <InteractiveFeatureCard
                icon={Zap}
                title="Lightning Fast"
                content="Optimized for speed with Next.js 13 App Router, giving you the best performance out of the box."
              />
              <InteractiveFeatureCard
                icon={Layers}
                title="Pre-configured Stack"
                content="Comes with TypeScript, ESLint, Prettier, and more, all set up and ready to go."
              />
              <InteractiveFeatureCard
                icon={Package}
                title="UI Components"
                content="Includes shadcn/ui for beautiful, accessible, and customizable components."
              />
            </motion.div>
          </div>
        </section>

        {/* Get Started Section */}
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0ff]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                  Clone our repository and start building your next great idea with the power of Next.js and our carefully curated starter kit.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" asChild>
                  <Link href="https://github.com/yourusername/your-repo">
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    Clone Repository
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2024 Next.js Starter Kit. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
