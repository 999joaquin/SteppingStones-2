import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Users,
  MessageCircle,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "@/components/contact-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="SteppingStones logo" width={32} height={32} className="h-8 w-8" />
            <h1 className="text-2xl font-prata text-header">SteppingStones</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#who-its-for" className="text-gray-700 hover:text-primary transition-colors">
              Who It's For
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="#contact">
            <Button className="bg-primary hover:bg-primary-dark text-white">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT COLUMN — TEXT  */}
            <div className="space-y-8">
              {/* Logo */}
              <Image
                src="/images/logo.png"
                alt="Stepping Stone logo"
                width={120}
                height={120}
                priority
                className="mx-auto mb-4"
              />

              {/* Heading & sub-copy */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-prata text-header leading-tight">
                  Warm. Intentional. Relation-Focused.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Professional marriage facilitation services that bring together compatible souls
                  through personalized matchmaking and relationship guidance.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
                  <Link href="#contact" className="flex items-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Link href="/learn-more">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN — IMAGE */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/hero-hands.jpg"
                  alt="Two hands reaching toward each other symbolizing connection"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">Our Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Moments of joy, love, and celebration from our successful matches and beautiful ceremonies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/showcase-1.jpg"
                alt="Happy couple celebration with Singapore skyline"
                width={400}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Celebration Moments</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/showcase-3.jpg"
                alt="Romantic couple with cherry blossoms"
                width={400}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Beautiful Ceremonies</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/showcase-2.jpg"
                alt="Happy couple portrait"
                width={400}
                height={400}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Personal Consultations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">About Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team of relationship counselors and matchmakers are dedicated to helping you find lasting
              love and happiness.
            </p>
          </div>

          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              <Image
                src="/images/team-photo.jpg"
                alt="SteppingStones team photo - Carl, Eulene, and Catherine"
                width={800}
                height={500}
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-prata mb-2">Our Dedicated Team</h3>
                <p className="text-lg opacity-90">Committed to helping you find lasting love</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">Carl</h3>
                <p className="text-gray-600 mb-4">Certified Marriage Facilitator</p>
                <p className="text-sm text-gray-500">
                  Carl has almost a decade of contributing to community service, with practice anchored around a
                  Postgraduate Diploma in Social Work from NUS. Married for over 30 years with 2 sons. Certified
                  marriage facilitator.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">Eulene</h3>
                <p className="text-gray-600 mb-4">Certified Marriage Facilitator</p>
                <p className="text-sm text-gray-500">
                  Eulene holds a Master of Social Science (Professional Counselling) and a Graduate Diploma in
                  Counselling Psychology. She is a certified Prepare & Enrich and PREP counsellor, trained in
                  Restorative Practices and couples counselling. She also heads the operations at SteppingStones for
                  child placement with adoptive parents. Married for over 30 years, mother of 2 daughters and a son.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">Catherine</h3>
                <p className="text-gray-600 mb-4">Family Support Specialist</p>
                <p className="text-sm text-gray-500">
                  Catherine holds a bachelor's degree in psychology and is trained in Solution Focused Brief Therapy and
                  Restorative Practices. With 30 years of experience supporting children, at-risk youths, and families,
                  she now focuses on assisting adoptive parents through SteppingStones. Married for 35 years with no
                  children.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-prata text-header mb-6">Us</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team is well-placed to guide you on your love journey. We are well-versed in applying
                  relationship-focused, evidence-based principles to enhance family-centric connections, including
                  marriage. With our collective years of service and personal lived experiences, we're here to support
                  your journey toward meaningful connection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">How We Help You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures you find not just a partner, but your perfect life companion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-prata text-header mb-2">Personalized Matching</h3>
                  <p className="text-gray-600">
                    We take time to understand your values, preferences, and life goals to find truly compatible
                    matches.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-prata text-header mb-2">Relationship Counseling</h3>
                  <p className="text-gray-600">
                    Professional guidance to help you build strong, lasting relationships from the very beginning.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-prata text-header mb-2">Privacy & Discretion</h3>
                  <p className="text-gray-600">
                    Your privacy is our priority. All interactions are handled with complete confidentiality.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-prata text-header mb-2">Ongoing Support</h3>
                  <p className="text-gray-600">
                    We're with you every step of the way, from first meeting to wedding planning and beyond.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/couple-hands.jpg"
                alt="Couple holding hands with wedding rings, symbolizing unity and commitment"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who-its-for" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our services are designed for serious individuals ready to find their life partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-prata text-header mb-2">Young Professionals</h3>
                <p className="text-sm text-gray-600">Career-focused individuals ready to find their life partner</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-prata text-header mb-2">Second Chances</h3>
                <p className="text-sm text-gray-600">Those ready to love again and build new relationships</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-prata text-header mb-2">Serious Seekers</h3>
                <p className="text-sm text-gray-600">Individuals committed to finding lasting, meaningful love</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-prata text-header mb-2">Busy Lifestyles</h3>
                <p className="text-sm text-gray-600">Those who need professional help navigating modern dating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-prata text-header mb-4">
              “Matching – Relationship-Focused – Compatible Singles”
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We facilitate intentional connections between individuals seeking lifelong commitment —
              grounded in values, communication, and compatibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
            {/* Commitment */}
            <div className="flex items-start">
              <div className="text-2xl mr-4 mt-1">💍</div>
              <div>
                <h3 className="text-xl font-semibold text-header mb-2">Commitment</h3>
                <p className="text-gray-600">
                  We help you reflect on your dedication to a long-term relationship built on trust and
                  shared vision. This includes your views on marriage, family, and emotional readiness for
                  lifelong partnership.
                </p>
              </div>
            </div>

            {/* Compatibility */}
            <div className="flex items-start">
              <div className="text-2xl mr-4 mt-1">🔍</div>
              <div>
                <h3 className="text-xl font-semibold text-header mb-2">Compatibility</h3>
                <p className="text-gray-600">
                  Through <span className="font-semibold">questionnaires, interviews, and personality profiling</span>,
                  we explore your values, communication style, and emotional needs to find a match that
                  truly fits — someone who complements who you are.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Quote */}
          <p className="text-center italic text-gray-500 text-lg">
            “You’ll understand yourself more than you ever did before.”
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your journey to finding love? Contact us today for a consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-prata text-header mb-2">Our Office</h3>
                  <p className="text-gray-600">
                    3779 Jalan Bukit Merah, #02-01 Bukit Merah Community Hub
                    <br />
                    Singapore 159462
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-prata text-header mb-2">Phone</h3>
                  <p className="text-gray-600">+65 8878 9804 / +65 6441 3906</p>
                  <p className="text-gray-600">+65 6446 3906</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-prata text-header mb-2">Email</h3>
                  <p className="text-gray-600">hello@steppingstones.com</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-prata text-header mb-4">Certifications</h3>
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
                  <Image
                    src="/images/cyber-safe-certification.png"
                    alt="Cyber Safe SG and Cyber Essentials Certified"
                    width={400}
                    height={120}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="pt-8">
                <h3 className="text-lg font-prata text-header mb-4">Find Us</h3>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://maps.google.com/maps?q=3779%20Jalan%20Bukit%20Merah%2C%20%2302-01%20Community%20Hub%2C%20Singapore%20159462&t=m&z=15&output=embed&iwloc=near"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12 bg-[rgba(145,64,81,1)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-prata">SteppingStones</h3>
              </div>
              <p className="text-gray-400">
                Helping hearts find their perfect match through professional marriage facilitation services.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-prata mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Matchmaking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Relationship Counseling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Wedding Planning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pre-marital Guidance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-prata mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-prata mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>3779 Jalan Bukit Merah, #02-01</li>
                <li>Bukit Merah Community Hub</li>
                <li>Singapore 159462</li>
                <li>+65 8878 9804 / +65 6441 3906</li>
                <li>+65 6446 3906</li>
                <li>hello@steppingstones.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SteppingStones Pte. Ltd. All Rights Reserved. Co Reg: 201906357W</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="https://wa.me/6588789804?text=Hi%2C%20I%E2%80%99m%20interested%20in%20beginning%20my%20marriage%20facilitation%20journey%20with%20Stepping%20Stone.%20Can%20I%20learn%20more%3F"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 shadow-lg">
            <MessageCircle className="h-8 w-8" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
