// Test script to verify admin system functionality
console.log("🧪 Testing SteppingStones Admin System...\n")

// Test 1: Environment Variables
console.log("1️⃣ Checking Environment Variables:")
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "JWT_SECRET",
]

let envVarsOk = true
requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar]
  if (value) {
    console.log(`   ✅ ${envVar}: Set (${value.substring(0, 20)}...)`)
  } else {
    console.log(`   ❌ ${envVar}: Missing`)
    envVarsOk = false
  }
})

if (!envVarsOk) {
  console.log("\n❌ Environment variables are missing. Please check your .env.local file.")
  process.exit(1)
}

// Test 2: Database Connection
console.log("\n2️⃣ Testing Database Connection:")
try {
  // This would normally test the database connection
  // For now, we'll just check if the environment variables are properly formatted
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const isValidUrl = supabaseUrl && supabaseUrl.startsWith("https://") && supabaseUrl.includes(".supabase.co")

  if (isValidUrl) {
    console.log("   ✅ Supabase URL format looks correct")
  } else {
    console.log("   ❌ Supabase URL format looks incorrect")
  }
} catch (error) {
  console.log(`   ❌ Database connection failed: ${error.message}`)
}

// Test 3: JWT Secret
console.log("\n3️⃣ Testing JWT Secret:")
const jwtSecret = process.env.JWT_SECRET
if (jwtSecret && jwtSecret.length >= 32) {
  console.log("   ✅ JWT Secret is set and has adequate length")
} else {
  console.log("   ⚠️  JWT Secret should be at least 32 characters long for security")
}

// Test 4: URLs to test
console.log("\n4️⃣ URLs to Test Manually:")
console.log("   🔗 Main Website: http://localhost:3000")
console.log("   🔗 Admin Login: http://localhost:3000/admin/login")
console.log("   🔗 Admin Dashboard: http://localhost:3000/admin/submissions")

console.log("\n5️⃣ Default Login Credentials:")
console.log("   📧 Email: admin@steppingstones.com")
console.log("   🔑 Password: admin123")
console.log("   ⚠️  Remember to change the default password!")

console.log("\n6️⃣ Testing Checklist:")
console.log("   □ Can access admin login page")
console.log("   □ Can login with default credentials")
console.log("   □ Can see admin dashboard")
console.log("   □ Can submit contact form")
console.log("   □ Contact form data appears in admin dashboard")
console.log("   □ Can logout successfully")
console.log("   □ Cannot access admin pages without login")

console.log("\n✅ Environment check complete! Now test manually using the URLs above.")
