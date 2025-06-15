import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Heart,
  Users,
  MessageCircle,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Star,
  Target,
  UserCheck,
  Calendar,
  Award,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "@/components/contact-form"

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="SteppingStones logo" width={32} height={32} className="h-8 w-8" />
              <h1 className="text-2xl font-prata text-header">SteppingStones</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/#who-its-for" className="text-gray-700 hover:text-primary transition-colors">
              Who It's For
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="#contact-form">
            <Button className="bg-primary hover:bg-primary-dark text-white">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-prata text-header leading-tight mb-6">
              Your Journey to Lasting Love
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Discover how our proven approach to marriage facilitation has helped hundreds of couples find their
              perfect match and build lasting relationships.
            </p>
            <div className="flex justify-center">
              <Image
                src="/images/couple-hands.jpg"
                alt="Couple holding hands symbolizing unity"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">Our Proven Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that finding your life partner shouldn't be left to chance. Our systematic approach combines
              professional expertise with personalized care.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Image
                src="/images/team-photo.jpg"
                alt="SteppingStones consultation process"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-prata text-header">Why Choose SteppingStones?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Evidence-Based Matching</h4>
                    <p className="text-gray-600">
                      Our team uses proven psychological principles and compatibility assessments to ensure meaningful
                      connections.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Professional Counselors</h4>
                    <p className="text-gray-600">
                      All our facilitators are certified professionals with advanced degrees in counseling and social
                      work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Holistic Support</h4>
                    <p className="text-gray-600">
                      We support you through every step, from initial consultation to wedding planning and beyond.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Proven Track Record</h4>
                    <p className="text-gray-600">
                      Over 500 successful matches with a 95% satisfaction rate among our clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our structured 6-step process ensures you receive personalized attention and the best possible matches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">1. Initial Consultation</h3>
                <p className="text-gray-600">
                  We begin with a comprehensive consultation to understand your values, preferences, and relationship
                  goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">2. Compatibility Assessment</h3>
                <p className="text-gray-600">
                  Using proven psychological tools, we assess your personality, values, and compatibility factors.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">3. Personalized Matching</h3>
                <p className="text-gray-600">
                  Our team carefully selects potential matches based on deep compatibility and shared life goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">4. Guided Introductions</h3>
                <p className="text-gray-600">
                  We facilitate meaningful first meetings in comfortable settings with ongoing support and guidance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">5. Relationship Coaching</h3>
                <p className="text-gray-600">
                  Ongoing counseling and support to help you build strong foundations for lasting relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-prata text-header mb-4">6. Long-term Support</h3>
                <p className="text-gray-600">
                  Continued guidance through engagement, wedding planning, and early marriage milestones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">Real Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from couples who found their perfect match through our personalized approach.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Image
                src="/images/showcase-1.jpg"
                alt="Success story couple"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-600 italic leading-relaxed">
                "We had both tried online dating and other matchmaking services without success. SteppingStones was
                different - they took the time to really understand who we were and what we wanted in a partner. The
                compatibility assessment was incredibly thorough, and when we met, we knew immediately that this was
                special."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-header text-lg">Michael & Sarah</p>
                  <p className="text-gray-500">Married 3 years, 1 child</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The counseling sessions were invaluable. They helped us understand each other's communication styles
                  and build a strong foundation before marriage."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-header">David & Lisa</p>
                    <p className="text-sm text-gray-500">Married 2 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "As busy professionals, we appreciated the personalized service. They understood our schedules and
                  made the process seamless."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-header">Alex & Sophie</p>
                    <p className="text-sm text-gray-500">Engaged</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "After my divorce, I thought I'd never find love again. SteppingStones gave me hope and helped me find
                  my soulmate."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-header">James & Maria</p>
                    <p className="text-sm text-gray-500">Married 1 year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-prata text-header mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our marriage facilitation process.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-prata text-header mb-4">How long does the process typically take?</h3>
                <p className="text-gray-600">
                  The timeline varies for each individual, but most clients meet their life partner within 6-12 months.
                  Our focus is on quality matches rather than speed, ensuring compatibility and long-term success.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-prata text-header mb-4">
                  What makes SteppingStones different from online dating?
                </h3>
                <p className="text-gray-600">
                  Unlike online platforms, we provide personalized, professional guidance throughout your journey. Our
                  certified counselors use evidence-based matching techniques and offer ongoing relationship coaching to
                  ensure lasting success.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-prata text-header mb-4">Do you work with people of all ages?</h3>
                <p className="text-gray-600">
                  Yes, we work with adults of all ages who are serious about finding a life partner. Our oldest
                  successful match was between clients in their 70s, proving that love has no age limit.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-prata text-header mb-4">How do you ensure privacy and confidentiality?</h3>
                <p className="text-gray-600">
                  We maintain strict confidentiality protocols. All client information is kept secure, and we only share
                  details with potential matches after receiving explicit consent from both parties.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-prata text-header mb-4">What ongoing support do you provide?</h3>
                <p className="text-gray-600">
                  Our support continues throughout your relationship journey. We offer pre-marital counseling, wedding
                  planning assistance, and post-marriage check-ins to ensure your relationship continues to thrive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-prata mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Take the first step towards finding your life partner. Schedule a consultation with our expert team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact-form">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://wa.me/6588789804?text=Hi%2C%20I%E2%80%99m%20interested%20in%20beginning%20my%20marriage%20facilitation%20journey%20with%20Stepping%20Stone.%20Can%20I%20learn%20more%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black bg-white hover:bg-primary hover:text-white hover:border-primary"
              >
                Chat on WhatsApp
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-prata text-header mb-4">Get Started Today</h2>
              <p className="text-lg text-gray-600">
                Ready to begin your journey? Fill out the form below and we'll be in touch within 24 hours.
              </p>
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
                  <Link href="/#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/learn-more" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
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
