import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock, Building } from "lucide-react";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate an API call delay for a more realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === "admin@example.com" && password === "password123") {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setIsLoading(false);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  const itemVariants = (delay = 0) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 12, delay } },
  });

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50"
      >
        <div className="p-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex flex-col items-center text-center mb-8"
          >
            <div className="bg-blue-600 rounded-full p-3 mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Sign in to access the management dashboard.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants(0.3)}>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 shadow-sm"
                  placeholder="admin@example.com"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants(0.4)}>
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants(0.5)}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-base py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </motion.div>
          </form>
        </div>
        
        <div className="bg-gray-50 p-4 border-t border-gray-200/80">
           <p className="text-xs text-center text-gray-500">
             For demo: <strong className="font-medium text-gray-600">admin@example.com</strong> / <strong className="font-medium text-gray-600">password123</strong>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;