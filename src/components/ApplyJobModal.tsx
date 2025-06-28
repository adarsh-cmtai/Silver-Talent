// client/src/components/ApplyJobModal.tsx
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Adjust path if your shadcn ui.json is different
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, FileText, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Job } from '@/pages/Vacancies'; // Assuming Job interface is exported from Vacancies.tsx

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend-2.onrender.com/api";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

interface FormDataState {
  name: string;
  email: string;
  coverLetter: string;
  resume: File | null;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const ALLOWED_FILE_EXTENSIONS_DISPLAY = '.pdf, .doc, .docx';


export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    coverLetter: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormDataState | 'file', string>>>({});
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);


  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', coverLetter: '', resume: null });
      setErrors({});
      setResumeFileName(null);
      const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  }, [isOpen, job]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrors(prev => ({ ...prev, resume: undefined, file: undefined })); 

    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrors(prev => ({ ...prev, resume: `File size exceeds ${MAX_FILE_SIZE_BYTES / (1024*1024)}MB.`}));
        setFormData(prev => ({ ...prev, resume: null }));
        setResumeFileName(null);
        e.target.value = ""; 
        return;
      }
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        // Check extension as a fallback for some OS/browser mimetype issues
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
        if (!ALLOWED_FILE_EXTENSIONS_DISPLAY.includes(fileExtension)) {
            setErrors(prev => ({ ...prev, resume: `Invalid file type. Allowed: ${ALLOWED_FILE_EXTENSIONS_DISPLAY}.`}));
            setFormData(prev => ({ ...prev, resume: null }));
            setResumeFileName(null);
            e.target.value = "";
            return;
        }
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setResumeFileName(file.name); 
    } else {
      setFormData(prev => ({ ...prev, resume: null }));
      setResumeFileName(null);
    }
  };

  const removeResume = () => {
    setFormData(prev => ({ ...prev, resume: null }));
    setResumeFileName(null);
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setErrors(prev => ({ ...prev, resume: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormDataState | 'file', string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.resume) newErrors.resume = `Resume (${ALLOWED_FILE_EXTENSIONS_DISPLAY}) is required.`;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job || !validateForm()) return;

    setIsSubmitting(true);
    const submissionData = new FormData(); 
    submissionData.append('jobId', job._id || job.id || 'N/A');
    submissionData.append('jobTitle', job.title);
    submissionData.append('companyName', job.company);
    submissionData.append('name', formData.name);
    submissionData.append('email', formData.email);
    submissionData.append('coverLetter', formData.coverLetter);
    if (formData.resume) {
      // 'resume' is the field name the backend (express-fileupload) will look for
      submissionData.append('resume', formData.resume, formData.resume.name);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/jobs/apply`, { // Endpoint from vacancyRoutes.js
        method: 'POST',
        body: submissionData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Application submission failed. Please try again.');
      }

      toast.success(result.message || 'Application submitted successfully!');
      onClose();
    } catch (error: any) {
      console.error('Application submission error:', error);
      toast.error(error.message || 'An unexpected error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[550px] bg-white p-0">
        <DialogHeader className="p-6 pb-4 border-b border-gray-200">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">Apply for: {job.title}</DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            At {job.company}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-5 max-h-[65vh] overflow-y-auto">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="name" name="name" type="text" value={formData.name} onChange={handleInputChange}
                placeholder="e.g., Jane Doe"
                className={`h-11 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                disabled={isSubmitting} required
              />
              {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="email" name="email" type="email" value={formData.email} onChange={handleInputChange}
                placeholder="e.g., jane.doe@example.com"
                className={`h-11 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                disabled={isSubmitting} required
              />
              {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1.5">
                Cover Letter <span className="text-xs text-gray-500">(Optional)</span>
              </Label>
              <Textarea
                id="coverLetter" name="coverLetter" value={formData.coverLetter} onChange={handleInputChange}
                placeholder="Briefly tell us why you're a great fit for this role..."
                className={`min-h-[100px] ${errors.coverLetter ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                disabled={isSubmitting} rows={4}
              />
              {errors.coverLetter && <p className="text-xs text-red-600 mt-1.5">{errors.coverLetter}</p>}
            </div>

            <div>
              <Label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-1.5">Upload Resume <span className="text-red-500">*</span></Label>
              {resumeFileName ? (
                <div className="mt-1 flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50">
                  <div className="flex items-center min-w-0"> {/* Added min-w-0 for truncation */}
                    <FileText className="w-5 h-5 mr-2 text-sky-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate" title={resumeFileName}>{resumeFileName}</span>
                  </div>
                  <Button 
                    type="button" variant="ghost" size="icon" 
                    className="text-red-500 hover:text-red-700 h-7 w-7 flex-shrink-0" 
                    onClick={removeResume} aria-label="Remove resume" disabled={isSubmitting}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.resume ? 'border-red-400' : 'border-gray-300'} border-dashed rounded-md hover:border-sky-400 transition-colors`}>
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="resume-upload"
                        className="relative cursor-pointer rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                      >
                        <span>Choose a file</span>
                        <Input 
                          id="resume-upload" name="resumeFileField" // This 'name' is for the input field itself, not the FormData key
                          type="file" className="sr-only" onChange={handleFileChange} 
                          accept={ALLOWED_FILE_EXTENSIONS_DISPLAY} 
                          disabled={isSubmitting}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">{ALLOWED_FILE_EXTENSIONS_DISPLAY} up to {MAX_FILE_SIZE_BYTES / (1024*1024)}MB</p>
                  </div>
                </div>
              )}
              {errors.resume && <p className="text-xs text-red-600 mt-1.5">{errors.resume}</p>}
              {errors.file && <p className="text-xs text-red-600 mt-1.5">{errors.file}</p>}
            </div>
          </div>

          <DialogFooter className="sm:justify-between p-6 border-t border-gray-200 bg-gray-50">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || !formData.resume} className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};