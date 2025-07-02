import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
  LogOut, Settings, Phone, Mail, MapPinIcon as MapPin, Briefcase, PlusCircle, Loader2,
  AlertTriangle, UploadCloud, ImagePlus, Trash2, Edit3, Layers, Menu, X, ListChecks, Edit,
  Users, FileText, Send, ExternalLink, Eye, MessageSquare, Inbox, CheckCircle, Archive, Trash, SendHorizonal, Pencil, Edit2, BellRing
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from '@/components/ui/badge';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend-2.onrender.com/api";

interface ContactInfo { _id?: string; address: string; phone: string; email: string; locationMapUrl: string; }
interface NewVacancyData { title: string; company: string; location: string; type: string; salary: string; category: string; description: string; skills: string; }
interface FetchedVacancyData extends NewVacancyData { _id: string; logo?: { public_id?: string; url: string }; createdAt?: string; }
interface FilterOptions { categories: string[]; locations?: string[]; jobTypes: string[]; }
interface BlogCategory { _id: string; name: string; slug: string; description?: string; createdAt?: string; }
interface NewBlogCategoryData { name: string; description: string; }
interface NewBlogPostData { title: string; excerpt: string; content: string; author: string; readTime: string; categoryId: string; tags: string; isPublished: boolean; }
interface FetchedBlogPostData extends Omit<NewBlogPostData, 'categoryId'> { _id: string; slug: string; category: BlogCategory | string; featuredImage?: { public_id?: string; url: string }; createdAt?: string; publishDate?: string; views?: number; }

interface Application {
  _id: string;
  jobId: { _id: string; title: string; } | string;
  jobTitle: string;
  companyName: string;
  name: string;
  email: string;
  coverLetter?: string;
  resume: { public_id?: string; url: string; };
  status: 'Pending' | 'Viewed' | 'In Progress' | 'Contacted' | 'Hired' | 'Rejected';
  appliedDate: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactSubmission {
  _id: string;
  yourName: string;
  yourEmail: string;
  fullPhoneNumber: string;
  countryName?: string;
  countryCode?: string;
  yourMessage: string;
  status: 'New' | 'Viewed' | 'Replied' | 'Archived';
  adminNotes?: string;
  submittedAt: string;
  repliedAt?: string;
}

interface Subscription {
  _id: string;
  email: string;
  createdAt: string;
}

type AdminSection = 'contact' | 'vacancy' | 'blog-category' | 'blog-post' |
  'manage-vacancies' | 'manage-blog-categories' | 'manage-blog-posts' |
  'manage-applications' | 'manage-contact-submissions' | 'manage-subscriptions';


const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('contact');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const [contactForm, setContactForm] = useState<ContactInfo>({ address: "", phone: "", email: "", locationMapUrl: "" });
  const [isContactLoading, setIsContactLoading] = useState<boolean>(true);
  const [isContactSubmitting, setIsContactSubmitting] = useState<boolean>(false);

  const initialVacancyState: NewVacancyData = { title: "", company: "", location: "", type: "", salary: "", category: "", description: "", skills: "" };
  const [vacancyForm, setVacancyForm] = useState<NewVacancyData>(initialVacancyState);
  const [editingVacancy, setEditingVacancy] = useState<FetchedVacancyData | null>(null);
  const [logoImageFile, setLogoImageFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmittingVacancy, setIsSubmittingVacancy] = useState<boolean>(false);
  const [jobCategories, setJobCategories] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [isLoadingVacancyFilters, setIsLoadingVacancyFilters] = useState<boolean>(true);
  const [allVacancies, setAllVacancies] = useState<FetchedVacancyData[]>([]);
  const [isLoadingAllVacancies, setIsLoadingAllVacancies] = useState<boolean>(false);
  const [showVacancyForm, setShowVacancyForm] = useState<boolean>(false);

  const initialBlogCategoryState: NewBlogCategoryData = { name: "", description: "" };
  const [blogCategoryForm, setBlogCategoryForm] = useState<NewBlogCategoryData>(initialBlogCategoryState);
  const [editingBlogCategory, setEditingBlogCategory] = useState<BlogCategory | null>(null);
  const [isSubmittingBlogCategory, setIsSubmittingBlogCategory] = useState<boolean>(false);
  const [allBlogCategories, setAllBlogCategories] = useState<BlogCategory[]>([]);
  const [isLoadingAllBlogCategories, setIsLoadingAllBlogCategories] = useState<boolean>(false);
  const [showBlogCategoryForm, setShowBlogCategoryForm] = useState<boolean>(false);

  const initialBlogPostState: NewBlogPostData = { title: "", excerpt: "", content: "", author: "", readTime: "5 min read", categoryId: "", tags: "", isPublished: false };
  const [blogPostForm, setBlogPostForm] = useState<NewBlogPostData>(initialBlogPostState);
  const [editingBlogPost, setEditingBlogPost] = useState<FetchedBlogPostData | null>(null);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [isSubmittingBlogPost, setIsSubmittingBlogPost] = useState<boolean>(false);
  const [blogPostCategoriesForDropdown, setBlogPostCategoriesForDropdown] = useState<BlogCategory[]>([]);
  const [isLoadingBlogCategoriesForDropdown, setIsLoadingBlogCategoriesForDropdown] = useState<boolean>(true);
  const [allBlogPosts, setAllBlogPosts] = useState<FetchedBlogPostData[]>([]);
  const [isLoadingAllBlogPosts, setIsLoadingAllBlogPosts] = useState<boolean>(false);
  const [showBlogPostForm, setShowBlogPostForm] = useState<boolean>(false);

  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [isLoadingAllApplications, setIsLoadingAllApplications] = useState<boolean>(false);
  const [selectedApplicationForView, setSelectedApplicationForView] = useState<Application | null>(null);
  const [isAppResponseModalOpen, setIsAppResponseModalOpen] = useState<boolean>(false);
  const [appAdminResponseForm, setAppAdminResponseForm] = useState({ subject: '', body: '' });
  const [isSendingAppResponse, setIsSendingAppResponse] = useState<boolean>(false);
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<string>("All");
  const applicationStatuses: Application['status'][] = ['Pending', 'Viewed', 'In Progress', 'Contacted', 'Hired', 'Rejected'];

  const [allContactSubmissions, setAllContactSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoadingContactSubmissions, setIsLoadingContactSubmissions] = useState<boolean>(false);
  const [selectedContactSubmissionForView, setSelectedContactSubmissionForView] = useState<ContactSubmission | null>(null);
  const [isContactMsgResponseModalOpen, setIsContactMsgResponseModalOpen] = useState<boolean>(false);
  const [contactMsgAdminResponseForm, setContactMsgAdminResponseForm] = useState({ subject: '', body: '' });
  const [isSendingContactMsgResponse, setIsSendingContactMsgResponse] = useState<boolean>(false);
  const [contactStatusFilter, setContactStatusFilter] = useState<string>("All");
  const contactSubmissionStatuses: ContactSubmission['status'][] = ['New', 'Viewed', 'Replied', 'Archived'];
  const [editingSubmissionNotes, setEditingSubmissionNotes] = useState<{ id: string; notes: string } | null>(null);
  const [isUpdatingNotes, setIsUpdatingNotes] = useState<boolean>(false);

  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([]);
  const [isLoadingAllSubscriptions, setIsLoadingAllSubscriptions] = useState<boolean>(false);


  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteAction, setDeleteAction] = useState<{ onConfirm: () => void; itemType?: string } | null>(null);

  const fetchContactInfo = async () => {
    setIsContactLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact-info`);
      if (!response.ok) throw new Error(`Contact Info: ${response.statusText || response.status}`);
      const data = await response.json();
      if (data.success && data.contactInfo) {
        setContactForm(data.contactInfo);
      } else if (data.success === false && Array.isArray(data.contactInfo) && data.contactInfo.length > 0) {
        setContactForm(data.contactInfo[0]);
      } else if (Object.keys(data).length > 0 && !data.success) {
      } else if (!data.success && Object.keys(data).length === 0) {
        console.warn("No contact info found, initializing with empty form.");
      }
    } catch (error: any) {
      console.error("Fetch Contact Info Error:", error);
    } finally {
      setIsContactLoading(false);
    }
  };
  const fetchVacancyFiltersAndSetDefaults = async () => {
    setIsLoadingVacancyFilters(true);
    try {
      const response = await fetch(`${API_BASE_URL}/filter-options`);
      if (!response.ok) throw new Error(`Vacancy Filters: ${response.statusText || response.status}`);
      const data: FilterOptions = await response.json();
      const activeJobCategories = data.categories?.filter(cat => cat !== "All Categories") || [];
      const activeJobTypes = data.jobTypes?.filter(type => type !== "All Types") || [];
      setJobCategories(activeJobCategories);
      setJobTypes(activeJobTypes);

      if (initialVacancyState.category === "" && activeJobCategories.length > 0) {
        setVacancyForm(prev => ({ ...prev, category: activeJobCategories[0] }));
      }
      if (initialVacancyState.type === "" && activeJobTypes.length > 0) {
        setVacancyForm(prev => ({ ...prev, type: activeJobTypes[0] }));
      }
    } catch (error: any) {
      console.error("Fetch Vacancy Filters Error:", error);
      toast.error(error.message || "Could not load vacancy filters.");
    } finally {
      setIsLoadingVacancyFilters(false);
    }
  };
  const fetchAllVacancies = async () => {
    setIsLoadingAllVacancies(true);
    try {
      const response = await fetch(`${API_BASE_URL}/jobs?admin_view=true&limit=200`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fetch Vacancies Failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      setAllVacancies(Array.isArray(data?.jobs) ? data.jobs : Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Fetch All Vacancies - Catch Block Error:", error);
      toast.error(error.message || "Could not load vacancies list.");
      setAllVacancies([]);
    } finally {
      setIsLoadingAllVacancies(false);
    }
  };
  const fetchAllBlogCategoriesForDropdownAndSetDefault = async () => {
    setIsLoadingBlogCategoriesForDropdown(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/categories`);
      if (!response.ok) throw new Error(`Blog Categories DD: ${response.statusText || response.status}`);
      const data: BlogCategory[] = await response.json();
      setBlogPostCategoriesForDropdown(data);
      if (initialBlogPostState.categoryId === "" && data.length > 0) {
        setBlogPostForm(prev => ({ ...prev, categoryId: data[0]._id }));
      }
    } catch (error: any) {
      console.error("Fetch Blog Categories DD Error:", error);
      toast.error(error.message || "Could not load blog categories for dropdown.");
    } finally {
      setIsLoadingBlogCategoriesForDropdown(false);
    }
  };
  const fetchAllBlogCategoriesForList = async () => {
    setIsLoadingAllBlogCategories(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/categories`);
      if (!response.ok) throw new Error(`Blog Categories List: ${response.statusText || response.status}`);
      const data: BlogCategory[] = await response.json();
      setAllBlogCategories(data);
    } catch (error: any) {
      console.error("Fetch Blog Categories List Error:", error);
      toast.error(error.message || "Could not load blog categories list.");
      setAllBlogCategories([]);
    } finally {
      setIsLoadingAllBlogCategories(false);
    }
  };
  const fetchAllBlogPosts = async () => {
    setIsLoadingAllBlogPosts(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/posts?admin_view=true&limit=200`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fetch Blog Posts Failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      setAllBlogPosts(Array.isArray(data?.posts) ? data.posts : Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Fetch All Blog Posts - Catch Block Error:", error);
      toast.error(error.message || "Could not load blog posts list.");
      setAllBlogPosts([]);
    } finally {
      setIsLoadingAllBlogPosts(false);
    }
  };
  const fetchAllApplications = async (status = "All") => {
    setIsLoadingAllApplications(true);
    setAllApplications([]);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (status !== "All") params.append('status_filter', status);

      const response = await fetch(`${API_BASE_URL}/applications?${params.toString()}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fetch Applications Failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      if (data?.success && Array.isArray(data.applications)) {
        setAllApplications(data.applications);
      } else {
        setAllApplications([]);
        if (data && !data.success) toast.error(data.message || "Failed to fetch applications (server error).");
      }
    } catch (error: any) {
      console.error("Fetch All Applications - Catch Block Error:", error);
      toast.error(error.message || "Could not load applications list.");
      setAllApplications([]);
    } finally {
      setIsLoadingAllApplications(false);
    }
  };
  const fetchAllContactSubmissions = async (status = "All") => {
    setIsLoadingContactSubmissions(true);
    setAllContactSubmissions([]);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (status !== "All") {
        params.append('status_filter', status);
      }

      const response = await fetch(`${API_BASE_URL}/contact-submissions?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Failed to fetch contact submissions: ${response.statusText}` }));
        throw new Error(errorData.message || `Failed to fetch contact submissions: ${response.status}`);
      }
      const data = await response.json();
      if (data?.success && Array.isArray(data.submissions)) {
        setAllContactSubmissions(data.submissions);
      } else {
        setAllContactSubmissions([]);
        if (data && !data.success) {
          toast.error(data.message || "Failed to fetch submissions (server error).");
        }
      }
    } catch (error: any) {
      console.error("Fetch All Contact Submissions - Catch Block Error:", error);
      toast.error(error.message || "Could not load contact submissions list.");
      setAllContactSubmissions([]);
    } finally {
      setIsLoadingContactSubmissions(false);
    }
  };

  const fetchAllSubscriptions = async () => {
    setIsLoadingAllSubscriptions(true);
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Could not fetch subscriptions." }));
        throw new Error(errorData.message || "Failed to fetch subscriptions.");
      }
      const data = await response.json();
      setAllSubscriptions(data.subscriptions || []);
    } catch (error: any) {
      toast.error(error.message);
      setAllSubscriptions([]);
    } finally {
      setIsLoadingAllSubscriptions(false);
    }
  };


  useEffect(() => {
    document.title = "Admin Dashboard | Silver Talent";
    fetchContactInfo();
    fetchVacancyFiltersAndSetDefaults();
    fetchAllBlogCategoriesForDropdownAndSetDefault();
  }, []);

  useEffect(() => {
    if (activeSection === 'manage-vacancies') fetchAllVacancies();
    if (activeSection === 'manage-blog-categories') fetchAllBlogCategoriesForList();
    if (activeSection === 'manage-blog-posts') fetchAllBlogPosts();
    if (activeSection === 'manage-applications') fetchAllApplications(applicationStatusFilter);
    if (activeSection === 'manage-contact-submissions') fetchAllContactSubmissions(contactStatusFilter);
    if (activeSection === 'manage-subscriptions') fetchAllSubscriptions();
  }, [activeSection, applicationStatusFilter, contactStatusFilter]);


  const handleLogout = () => {
    toast.success("Admin logged out successfully!");
    navigate("/admin-login");
  };
  const openDeleteConfirmDialog = (onConfirm: () => void, itemType: string = "item") => {
    setDeleteAction({ onConfirm, itemType });
    setShowDeleteConfirm(true);
  };

  const resetAndCloseVacancyForm = () => {
    setVacancyForm(initialVacancyState);
    setEditingVacancy(null);
    setLogoImageFile(null);
    setLogoPreview(null);
    setShowVacancyForm(false);
  };
  const resetAndCloseBlogCategoryForm = () => {
    setBlogCategoryForm(initialBlogCategoryState);
    setEditingBlogCategory(null);
    setShowBlogCategoryForm(false);
  };
  const resetAndCloseBlogPostForm = () => {
    setBlogPostForm(initialBlogPostState);
    setEditingBlogPost(null);
    setBlogImageFile(null);
    setBlogImagePreview(null);
    setShowBlogPostForm(false);
  };

  const handleContactInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleContactInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setIsContactSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Update failed.");
      toast.success(result.message || "Contact info updated!");
      if (result.data) setContactForm(result.data);
    } catch (error: any) { toast.error(error.message); }
    finally { setIsContactSubmitting(false); }
  };

  const handleVacancyFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVacancyForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleVacancySelectChange = (name: keyof NewVacancyData, value: string) => setVacancyForm(prev => ({ ...prev, [name]: value }));
  const handleLogoImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { toast.error("Logo max 2MB."); e.target.value = ""; return; }
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(file.type)) { toast.error("Invalid logo type."); e.target.value = ""; return; }
      setLogoImageFile(file); setLogoPreview(URL.createObjectURL(file));
    } else { setLogoImageFile(null); setLogoPreview(null); }
  };
  const removeVacancyLogoImage = (isEditing = false) => {
    setLogoImageFile(null); setLogoPreview(null);
    if (isEditing && editingVacancy) setVacancyForm(prev => ({ ...prev, ['removeLogo' as any]: 'true' }));
    const fileInput = document.getElementById('logoImage') as HTMLInputElement; if (fileInput) fileInput.value = "";
  };
  const handleVacancySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setIsSubmittingVacancy(true);
    const formData = new FormData();
    Object.entries(vacancyForm).forEach(([k, v]) => {
      if (k === 'removeLogo' && v === 'true') formData.append(k, 'true');
      else if (k !== 'removeLogo') formData.append(k, v as string);
    });
    if (logoImageFile) formData.append('logoImage', logoImageFile);

    const url = editingVacancy ? `${API_BASE_URL}/jobs/${editingVacancy._id}` : `${API_BASE_URL}/jobs`;
    const method = editingVacancy ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Vacancy ${editingVacancy ? 'update' : 'add'} failed.`);
      toast.success(result.message || `Vacancy ${editingVacancy ? 'updated' : 'added'}!`);
      resetAndCloseVacancyForm();
      fetchAllVacancies();
      setActiveSection('manage-vacancies');
    } catch (error: any) { toast.error(error.message); }
    finally { setIsSubmittingVacancy(false); }
  };
  const handleEditVacancy = (vacancy: FetchedVacancyData) => {
    setEditingVacancy(vacancy);
    setVacancyForm({
      title: vacancy.title, company: vacancy.company, location: vacancy.location, type: vacancy.type,
      salary: vacancy.salary, category: vacancy.category, description: vacancy.description,
      skills: Array.isArray(vacancy.skills) ? vacancy.skills.join(', ') : (vacancy.skills || ""),
    });
    setLogoPreview(vacancy.logo?.url || null);
    setLogoImageFile(null);
    setShowVacancyForm(true);
    setActiveSection('vacancy');
  };
  const handleDeleteVacancy = async (vacancyId: string) => {
    openDeleteConfirmDialog(async () => {
      setIsSubmittingVacancy(true);
      try {
        const response = await fetch(`${API_BASE_URL}/jobs/${vacancyId}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Delete vacancy failed.");
        toast.success(result.message || "Vacancy deleted!");
        setAllVacancies(prev => prev.filter(v => v._id !== vacancyId));
      } catch (error: any) { toast.error(error.message); }
      finally { setIsSubmittingVacancy(false); setShowDeleteConfirm(false); }
    }, "vacancy");
  };

  const handleBlogCategoryFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setBlogCategoryForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlogCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blogCategoryForm.name.trim()) { toast.error("Category name is required."); return; }
    setIsSubmittingBlogCategory(true);
    const url = editingBlogCategory ? `${API_BASE_URL}/blog/categories/${editingBlogCategory._id}` : `${API_BASE_URL}/blog/categories`;
    const method = editingBlogCategory ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogCategoryForm) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Failed to ${editingBlogCategory ? 'update' : 'add'} blog category.`);
      toast.success(result.message || `Blog category ${editingBlogCategory ? 'updated' : 'added'}!`);
      resetAndCloseBlogCategoryForm();
      fetchAllBlogCategoriesForList();
      fetchAllBlogCategoriesForDropdownAndSetDefault();
      setActiveSection('manage-blog-categories');
    } catch (error: any) { toast.error(error.message || `Could not ${editingBlogCategory ? 'update' : 'add'} blog category.`); }
    finally { setIsSubmittingBlogCategory(false); }
  };
  const handleEditBlogCategory = (category: BlogCategory) => {
    setEditingBlogCategory(category);
    setBlogCategoryForm({ name: category.name, description: category.description || "" });
    setShowBlogCategoryForm(true);
    setActiveSection('blog-category');
  };
  const handleDeleteBlogCategory = (categoryId: string) => {
    openDeleteConfirmDialog(async () => {
      setIsSubmittingBlogCategory(true);
      try {
        const response = await fetch(`${API_BASE_URL}/blog/categories/${categoryId}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Delete blog category failed.");
        toast.success(result.message || "Blog category deleted!");
        setAllBlogCategories(prev => prev.filter(c => c._id !== categoryId));
        fetchAllBlogCategoriesForDropdownAndSetDefault();
      } catch (error: any) { toast.error(error.message); }
      finally { setIsSubmittingBlogCategory(false); setShowDeleteConfirm(false); }
    }, "blog category");
  };

  const handleBlogPostFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setBlogPostForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlogPostSelectChange = (name: 'categoryId', value: string) => setBlogPostForm(prev => ({ ...prev, [name]: value }));
  const handleBlogImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { toast.error("Image max 2MB."); e.target.value = ""; return; }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast.error("Invalid image type."); e.target.value = ""; return; }
      setBlogImageFile(file); setBlogImagePreview(URL.createObjectURL(file));
    } else { setBlogImageFile(null); setBlogImagePreview(null); }
  };
  const removeBlogPostImage = (isEditing = false) => {
    setBlogImageFile(null); setBlogImagePreview(null);
    if (isEditing && editingBlogPost) setBlogPostForm(prev => ({ ...prev, ['removeFeaturedImage' as any]: 'true' }));
    const fileInput = document.getElementById('blogFeaturedImage') as HTMLInputElement; if (fileInput) fileInput.value = "";
  };
  const handleNewBlogPostCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') setBlogPostForm(prev => ({ ...prev, isPublished: checked }));
  };
  const handleBlogPostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setIsSubmittingBlogPost(true);
    const formData = new FormData();
    Object.entries(blogPostForm).forEach(([k, v]) => {
      if (k === 'removeFeaturedImage' && v === 'true') formData.append(k, 'true');
      else if (k !== 'removeFeaturedImage') formData.append(k, String(v));
    });
    if (blogImageFile) formData.append('featuredImageFile', blogImageFile);

    const url = editingBlogPost ? `${API_BASE_URL}/blog/posts/${editingBlogPost._id}` : `${API_BASE_URL}/blog/posts`;
    const method = editingBlogPost ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, { method, body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || `Blog post ${editingBlogPost ? 'update' : 'add'} failed.`);
      toast.success(result.message || `Blog post ${editingBlogPost ? 'updated' : 'added'}!`);
      resetAndCloseBlogPostForm();
      fetchAllBlogPosts();
      setActiveSection('manage-blog-posts');
    } catch (error: any) { toast.error(error.message); }
    finally { setIsSubmittingBlogPost(false); }
  };
  const handleEditBlogPost = async (postId: string) => {
    setIsSubmittingBlogPost(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog/posts/${postId}`);
      if (!response.ok) throw new Error("Failed to fetch post details for editing.");
      const postToEdit: FetchedBlogPostData = await response.json();
      setEditingBlogPost(postToEdit);
      setBlogPostForm({
        title: postToEdit.title, excerpt: postToEdit.excerpt,
        content: Array.isArray(postToEdit.content) ? postToEdit.content.join('\n\n') : (postToEdit.content || ""),
        author: postToEdit.author, readTime: postToEdit.readTime,
        categoryId: typeof postToEdit.category === 'string' ? postToEdit.category : postToEdit.category._id,
        tags: Array.isArray(postToEdit.tags) ? postToEdit.tags.join(', ') : (postToEdit.tags || ""),
        isPublished: postToEdit.isPublished || false,
      });
      setBlogImagePreview(postToEdit.featuredImage?.url || null);
      setBlogImageFile(null);
      setShowBlogPostForm(true);
      setActiveSection('blog-post');
    } catch (error: any) { toast.error(error.message || "Could not load post for editing."); }
    finally { setIsSubmittingBlogPost(false); }
  };
  const handleDeleteBlogPost = (postId: string) => {
    openDeleteConfirmDialog(async () => {
      setIsSubmittingBlogPost(true);
      try {
        const response = await fetch(`${API_BASE_URL}/blog/posts/${postId}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Delete blog post failed.");
        toast.success(result.message || "Blog post deleted!");
        setAllBlogPosts(prev => prev.filter(p => p._id !== postId));
      } catch (error: any) { toast.error(error.message); }
      finally { setIsSubmittingBlogPost(false); setShowDeleteConfirm(false); }
    }, "blog post");
  };

  const handleOpenAppResponseModal = (application: Application) => {
    setSelectedApplicationForView(application);
    const initialSubject = `Regarding your application for ${application.jobTitle || 'the position'}`;
    const initialBody = `Dear ${application.name || 'Applicant'},\n\nThank you for your interest in the ${application.jobTitle || 'position'} at ${application.companyName || 'our company'}.\n\n[Your message here - please replace this bracketed text]\n\nSincerely,\nThe Silver Talent Team`;

    setAppAdminResponseForm({ subject: initialSubject, body: initialBody });
    setIsAppResponseModalOpen(true);
  };
  const handleAppAdminResponseFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'subject' || name === 'body') {
      setAppAdminResponseForm(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSendAppAdminResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedApplicationForView) { toast.error("No application selected."); return; }
    if (!String(appAdminResponseForm.subject).trim() || !String(appAdminResponseForm.body).trim()) {
      toast.error("Subject and response body are required."); return;
    }
    setIsSendingAppResponse(true);
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${selectedApplicationForView._id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appAdminResponseForm),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to send response.");
      toast.success(result.message || "Response sent to applicant!");
      setIsAppResponseModalOpen(false);
      fetchAllApplications(applicationStatusFilter);
    } catch (error: any) { toast.error(error.message || "Could not send response."); }
    finally { setIsSendingAppResponse(false); }
  };

  const handleOpenContactResponseModal = (submission: ContactSubmission) => {
    setSelectedContactSubmissionForView(submission);
    const initialSubject = `Re: Your message to Silver Talent (Ref: ${submission._id.slice(-6)})`;
    const initialBody = `Dear ${submission.yourName},\n\nThank you for contacting us. Regarding your message:\n\n"${submission.yourMessage.substring(0, 100)}${submission.yourMessage.length > 100 ? '...' : ''}"\n\n[Your response here]\n\nSincerely,\nThe Silver Talent Team`;

    setContactMsgAdminResponseForm({ subject: initialSubject, body: initialBody });
    setIsContactMsgResponseModalOpen(true);

    if (submission.status === 'New') {
      updateContactSubmissionStatus(submission._id, 'Viewed', submission.adminNotes);
    }
  };
  const handleContactMsgAdminResponseFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'subject' || name === 'body') {
      setContactMsgAdminResponseForm(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSendContactMsgAdminResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedContactSubmissionForView) { toast.error("No submission selected."); return; }
    if (!String(contactMsgAdminResponseForm.subject).trim() || !String(contactMsgAdminResponseForm.body).trim()) {
      toast.error("Subject and response body are required."); return;
    }

    setIsSendingContactMsgResponse(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact-submissions/${selectedContactSubmissionForView._id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactMsgAdminResponseForm),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to send response.");
      toast.success(result.message || "Response sent to user!");

      setIsContactMsgResponseModalOpen(false);
      fetchAllContactSubmissions(contactStatusFilter);
    } catch (error: any) {
      toast.error(error.message || "Could not send response.");
    } finally {
      setIsSendingContactMsgResponse(false);
    }
  };

  const updateContactSubmissionStatus = async (submissionId: string, newStatus: ContactSubmission['status'], notes?: string) => {
    setIsUpdatingNotes(true);
    try {
      const payload: { status: ContactSubmission['status'], adminNotes?: string } = { status: newStatus };
      if (notes !== undefined) {
        payload.adminNotes = notes;
      }

      const response = await fetch(`${API_BASE_URL}/contact-submissions/${submissionId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to update status.");

      setAllContactSubmissions(prevSubs =>
        prevSubs.map(sub =>
          sub._id === submissionId ?
            { ...sub, ...result.submission }
            : sub
        )
      );
      if (selectedContactSubmissionForView?._id === submissionId) {
        setSelectedContactSubmissionForView(prev => prev ? { ...prev, ...result.submission } : null);
      }
      return true;
    } catch (error: any) {
      toast.error(error.message || "Could not update status/notes.");
      return false;
    } finally {
      setIsUpdatingNotes(false);
    }
  };

  const handleDeleteContactSubmission = (submissionId: string) => {
    openDeleteConfirmDialog(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/contact-submissions/${submissionId}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Delete failed.");
        toast.success(result.message || "Submission deleted!");
        setAllContactSubmissions(prev => prev.filter(s => s._id !== submissionId));
      } catch (error: any) { toast.error(error.message); }
      finally {
        setShowDeleteConfirm(false);
      }
    }, "contact submission");
  };

  const handleDeleteSubscription = (subscriptionId: string) => {
    openDeleteConfirmDialog(async () => {
      setIsLoadingAllSubscriptions(true);
      try {
        const response = await fetch(`${API_BASE_URL}/subscriptions/${subscriptionId}`, { method: 'DELETE' });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to delete subscription.");
        toast.success(result.message || "Subscription deleted!");
        setAllSubscriptions(prev => prev.filter(s => s._id !== subscriptionId));
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoadingAllSubscriptions(false);
        setShowDeleteConfirm(false);
      }
    }, "email subscription");
  };


  const handleEditNotes = (submission: ContactSubmission) => {
    setEditingSubmissionNotes({ id: submission._id, notes: submission.adminNotes || "" });
  };
  const handleSaveNotes = async () => {
    if (!editingSubmissionNotes) return;
    setIsUpdatingNotes(true);
    const currentSubmission = allContactSubmissions.find(s => s._id === editingSubmissionNotes.id);
    if (!currentSubmission) {
      toast.error("Submission not found for notes update.");
      setIsUpdatingNotes(false);
      return;
    }
    const success = await updateContactSubmissionStatus(
      editingSubmissionNotes.id,
      currentSubmission.status,
      editingSubmissionNotes.notes
    );
    if (success) {
      toast.success("Admin notes updated!");
      setEditingSubmissionNotes(null);
    }
    setIsUpdatingNotes(false);
  };


  const renderSidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isSidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-20 ${isSidebarOpen ? 'w-60 sm:w-64' : 'w-0 overflow-hidden'
        }`}
    >
      <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Admin Panel</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden hover:bg-gray-100 transition-colors">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <nav className="p-2 sm:p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {[
          { section: 'contact' as AdminSection, label: 'Contact Info', icon: Settings, action: () => { setActiveSection('contact'); setShowVacancyForm(false); setShowBlogCategoryForm(false); setShowBlogPostForm(false); } },
          { section: 'manage-contact-submissions' as AdminSection, label: 'Contact Inbox', icon: Inbox, action: () => { setActiveSection('manage-contact-submissions'); setShowVacancyForm(false); setShowBlogCategoryForm(false); setShowBlogPostForm(false); } },
          { section: 'manage-subscriptions' as AdminSection, label: 'Email Subscribers', icon: BellRing, action: () => { setActiveSection('manage-subscriptions'); setShowVacancyForm(false); setShowBlogCategoryForm(false); setShowBlogPostForm(false); } },
          { section: 'vacancy' as AdminSection, label: 'Add Vacancy', icon: PlusCircle, action: () => { resetAndCloseVacancyForm(); setActiveSection('vacancy'); setShowVacancyForm(true); setShowBlogCategoryForm(false); setShowBlogPostForm(false); } },
          { section: 'manage-vacancies' as AdminSection, label: 'Manage Vacancies', icon: ListChecks, action: () => { setActiveSection('manage-vacancies'); setShowVacancyForm(false); setShowBlogCategoryForm(false); setShowBlogPostForm(false); } },
          { section: 'manage-applications' as AdminSection, label: 'Manage Applications', icon: Users, action: () => { setActiveSection('manage-applications'); setShowVacancyForm(false); setShowBlogCategoryForm(false); setShowBlogPostForm(false); } },
          { section: 'blog-category' as AdminSection, label: 'Add Blog Category', icon: PlusCircle, action: () => { resetAndCloseBlogCategoryForm(); setActiveSection('blog-category'); setShowBlogCategoryForm(true); setShowVacancyForm(false); setShowBlogPostForm(false); } },
          { section: 'manage-blog-categories' as AdminSection, label: 'Manage Categories', icon: Layers, action: () => { setActiveSection('manage-blog-categories'); setShowBlogCategoryForm(false); setShowVacancyForm(false); setShowBlogPostForm(false); } },
          { section: 'blog-post' as AdminSection, label: 'Add Blog Post', icon: PlusCircle, action: () => { resetAndCloseBlogPostForm(); setActiveSection('blog-post'); setShowBlogPostForm(true); setShowVacancyForm(false); setShowBlogCategoryForm(false); } },
          { section: 'manage-blog-posts' as AdminSection, label: 'Manage Blog Posts', icon: Edit3, action: () => { setActiveSection('manage-blog-posts'); setShowBlogPostForm(false); setShowVacancyForm(false); setShowBlogCategoryForm(false); } },
        ].map(item => (
          <motion.div key={item.section} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={activeSection === item.section ||
                (item.section === 'vacancy' && showVacancyForm) ||
                (item.section === 'blog-category' && showBlogCategoryForm) ||
                (item.section === 'blog-post' && showBlogPostForm)
                ? 'secondary' : 'ghost'}
              className="w-full justify-start text-xs sm:text-sm py-2.5"
              onClick={item.action}
            >
              <item.icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> {item.label}
            </Button>
          </motion.div>
        ))}
        <div className="pt-4 mt-4 border-t">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm py-2.5" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Logout</Button>
          </motion.div>
        </div>
      </nav>
    </motion.div>
  );
  const renderContactSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200"> <Settings size={20} className="mr-2 sm:mr-3 text-sky-600" /> <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Manage Contact Information</h2></div>
      {isContactLoading ? (<div className="space-y-4">{[...Array(4)].map((_, i) => (<div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>))}</div>
      ) : (
        <form onSubmit={handleContactInfoSubmit} className="space-y-4 sm:space-y-6">
          <div><Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center mb-1"><MapPin size={14} className="mr-2 text-gray-500" /> Address</Label><Textarea id="address" name="address" value={contactForm.address} onChange={handleContactInputChange} className="mt-1 text-sm sm:text-base" rows={3} required disabled={isContactSubmitting} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div><Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center mb-1"><Phone size={14} className="mr-2 text-gray-500" /> Phone</Label><Input id="phone" name="phone" type="tel" value={contactForm.phone} onChange={handleContactInputChange} className="mt-1 text-sm sm:text-base" required disabled={isContactSubmitting} /></div>
            <div><Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center mb-1"><Mail size={14} className="mr-2 text-gray-500" /> Email</Label><Input id="email" name="email" type="email" value={contactForm.email} onChange={handleContactInputChange} className="mt-1 text-sm sm:text-base" required disabled={isContactSubmitting} /></div>
          </div>
          <div><Label htmlFor="locationMapUrl" className="text-sm font-medium text-gray-700 flex items-center mb-1"><MapPin size={14} className="mr-2 text-gray-500" /> Maps URL</Label><Input id="locationMapUrl" name="locationMapUrl" type="url" value={contactForm.locationMapUrl} onChange={handleContactInputChange} placeholder="https://..." className="mt-1 text-sm sm:text-base" disabled={isContactSubmitting} /></div>
          <div><Button type="submit" className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-sm sm:text-base" disabled={isContactSubmitting}>{isContactSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Contact</Button></div>
        </form>
      )}
    </motion.div>
  );
  const renderVacancyFormSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b"> <div className="flex items-center"><PlusCircle size={24} className="mr-3 text-green-600" /><h2 className="text-2xl font-semibold text-gray-700">{editingVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}</h2></div> <Button variant="outline" onClick={() => { resetAndCloseVacancyForm(); setActiveSection('manage-vacancies'); }}>Cancel</Button></div>
      {isLoadingVacancyFilters ? (<div className="space-y-4">{[...Array(6)].map((_, i) => (<div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>))}</div>) : (
        <form onSubmit={handleVacancySubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div><Label htmlFor="title">Job Title *</Label><Input id="title" name="title" value={vacancyForm.title} onChange={handleVacancyFormChange} required disabled={isSubmittingVacancy} /></div>
            <div><Label htmlFor="company">Company *</Label><Input id="company" name="company" value={vacancyForm.company} onChange={handleVacancyFormChange} required disabled={isSubmittingVacancy} /></div>
            <div><Label htmlFor="location">Location *</Label><Input id="location" name="location" value={vacancyForm.location} onChange={handleVacancyFormChange} required placeholder="e.g., City, ST or Remote" disabled={isSubmittingVacancy} /></div>
            <div><Label htmlFor="salary">Salary *</Label><Input id="salary" name="salary" value={vacancyForm.salary} onChange={handleVacancyFormChange} required placeholder="e.g., $100k - $120k" disabled={isSubmittingVacancy} /></div>
            <div><Label htmlFor="category">Category *</Label><Select name="category" value={vacancyForm.category} onValueChange={(v) => handleVacancySelectChange("category", v)} required disabled={isSubmittingVacancy || jobCategories.length === 0}><SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{jobCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="type">Job Type *</Label><Select name="type" value={vacancyForm.type} onValueChange={(v) => handleVacancySelectChange("type", v)} required disabled={isSubmittingVacancy || jobTypes.length === 0}><SelectTrigger id="type"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{jobTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
            <div className="md:col-span-2"><Label htmlFor="logoImage">Company Logo</Label><div className="mt-1 flex items-center gap-4">{logoPreview ? (<div className="relative group"><img src={logoPreview} alt="Logo" className="h-20 w-20 rounded-md object-contain border p-1" /><Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeVacancyLogoImage(!!editingVacancy)}><Trash2 className="h-3 w-3" /></Button></div>) : (<div className="h-20 w-20 rounded-md border-dashed border-2 flex flex-col items-center justify-center bg-gray-50 text-gray-400"><ImagePlus className="h-8 w-8" /><span className="text-xs mt-1">Upload</span></div>)}<Input id="logoImage" name="logoImage" type="file" accept="image/*" onChange={handleLogoImageChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" disabled={isSubmittingVacancy} /><p className="text-xs text-gray-500">Max 2MB.</p></div></div>
            <div className="md:col-span-2"><Label htmlFor="skills">Skills (comma-separated)</Label><Input id="skills" name="skills" value={vacancyForm.skills} onChange={handleVacancyFormChange} placeholder="e.g., React, Node.js" disabled={isSubmittingVacancy} /></div>
          </div>
          <div className="md:col-span-2"><Label htmlFor="description">Description *</Label><Textarea id="description" name="description" value={vacancyForm.description} onChange={handleVacancyFormChange} required rows={6} disabled={isSubmittingVacancy} /></div>
          <div><Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmittingVacancy || isLoadingVacancyFilters}>{isSubmittingVacancy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editingVacancy ? 'Update Vacancy' : 'Add Vacancy'}</Button></div>
        </form>
      )}
    </motion.div>
  );
  const renderManageVacanciesSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b"><h2 className="text-2xl font-semibold text-gray-700">Manage Vacancies</h2><Button onClick={() => { resetAndCloseVacancyForm(); setActiveSection('vacancy'); setShowVacancyForm(true); }}> <PlusCircle size={18} className="mr-2" /> Add New Vacancy</Button></div>
      {isLoadingAllVacancies ? <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin text-sky-600" /></div> : !allVacancies || allVacancies.length === 0 ? <p className="text-center text-gray-500 py-5">No vacancies found.</p> : (
        <div className="overflow-x-auto">
          <Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Company</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{allVacancies.map(job => (<TableRow key={job._id}><TableCell className="font-medium max-w-xs truncate">{job.title}</TableCell><TableCell className="max-w-xs truncate">{job.company}</TableCell><TableCell>{job.category}</TableCell><TableCell className="text-right space-x-2"><Button variant="outline" size="sm" onClick={() => handleEditVacancy(job)}><Edit size={16} className="mr-1" /> Edit</Button><Button variant="destructive" size="sm" onClick={() => handleDeleteVacancy(job._id)}><Trash2 size={16} className="mr-1" /> Delete</Button></TableCell></TableRow>))}</TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
  const renderBlogCategoryFormSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b"><div className="flex items-center"><Layers size={24} className="mr-3 text-indigo-600" /><h2 className="text-2xl font-semibold text-gray-700">{editingBlogCategory ? 'Edit Blog Category' : 'Add New Blog Category'}</h2></div><Button variant="outline" onClick={() => { resetAndCloseBlogCategoryForm(); setActiveSection('manage-blog-categories'); }}>Cancel</Button></div>
      <form onSubmit={handleBlogCategorySubmit} className="space-y-6">
        <div><Label htmlFor="blogCategoryName">Category Name *</Label><Input id="blogCategoryName" name="name" value={blogCategoryForm.name} onChange={handleBlogCategoryFormChange} required disabled={isSubmittingBlogCategory} placeholder="e.g., Technology Trends" /></div>
        <div><Label htmlFor="blogCategoryDescription">Description (Optional)</Label><Textarea id="blogCategoryDescription" name="description" value={blogCategoryForm.description} onChange={handleBlogCategoryFormChange} rows={3} disabled={isSubmittingBlogCategory} placeholder="A brief description." /></div>
        <div><Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isSubmittingBlogCategory}>{isSubmittingBlogCategory && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editingBlogCategory ? 'Update Category' : 'Add Category'}</Button></div>
      </form>
    </motion.div>
  );
  const renderManageBlogCategoriesSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b"><h2 className="text-2xl font-semibold text-gray-700">Manage Blog Categories</h2><Button onClick={() => { resetAndCloseBlogCategoryForm(); setActiveSection('blog-category'); setShowBlogCategoryForm(true); }}> <PlusCircle size={18} className="mr-2" /> Add New Category</Button></div>
      {isLoadingAllBlogCategories ? <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div> : !allBlogCategories || allBlogCategories.length === 0 ? <p className="text-center text-gray-500 py-5">No blog categories found.</p> : (
        <div className="overflow-x-auto">
          <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{allBlogCategories.map(cat => (<TableRow key={cat._id}><TableCell className="font-medium">{cat.name}</TableCell><TableCell className="text-sm text-gray-600 truncate max-w-xs">{cat.description || '-'}</TableCell><TableCell className="text-right space-x-2"><Button variant="outline" size="sm" onClick={() => handleEditBlogCategory(cat)}><Edit size={16} className="mr-1" /> Edit</Button><Button variant="destructive" size="sm" onClick={() => handleDeleteBlogCategory(cat._id)}><Trash2 size={16} className="mr-1" /> Delete</Button></TableCell></TableRow>))}</TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
  const renderBlogPostFormSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b"><div className="flex items-center"><Edit3 size={24} className="mr-3 text-purple-600" /><h2 className="text-2xl font-semibold text-gray-700">{editingBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}</h2></div><Button variant="outline" onClick={() => { resetAndCloseBlogPostForm(); setActiveSection('manage-blog-posts'); }}>Cancel</Button></div>
      {isLoadingBlogCategoriesForDropdown ? (<div className="space-y-4">{[...Array(7)].map((_, i) => (<div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>))}</div>) : (
        <form onSubmit={handleBlogPostSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div><Label htmlFor="blogTitle">Post Title *</Label><Input id="blogTitle" name="title" value={blogPostForm.title} onChange={handleBlogPostFormChange} required disabled={isSubmittingBlogPost} /></div>
            <div><Label htmlFor="blogAuthor">Author *</Label><Input id="blogAuthor" name="author" value={blogPostForm.author} onChange={handleBlogPostFormChange} required disabled={isSubmittingBlogPost} /></div>
            <div><Label htmlFor="blogCategoryId">Category *</Label><Select name="categoryId" value={blogPostForm.categoryId} onValueChange={(v) => handleBlogPostSelectChange("categoryId", v)} required disabled={isSubmittingBlogPost || isLoadingBlogCategoriesForDropdown || blogPostCategoriesForDropdown.length === 0}><SelectTrigger id="blogCategoryId"><SelectValue placeholder={isLoadingBlogCategoriesForDropdown ? "Loading..." : blogPostCategoriesForDropdown.length === 0 ? "No categories" : "Select category"} /></SelectTrigger><SelectContent>{!isLoadingBlogCategoriesForDropdown && blogPostCategoriesForDropdown.map(cat => <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="blogReadTime">Read Time *</Label><Input id="blogReadTime" name="readTime" value={blogPostForm.readTime} onChange={handleBlogPostFormChange} required placeholder="e.g., 5 min read" disabled={isSubmittingBlogPost} /></div>
            <div className="md:col-span-2"><Label htmlFor="blogExcerpt">Excerpt *</Label><Textarea id="blogExcerpt" name="excerpt" value={blogPostForm.excerpt} onChange={handleBlogPostFormChange} required rows={3} disabled={isSubmittingBlogPost} /></div>
            <div className="md:col-span-2"><Label htmlFor="blogContent">Full Content *</Label><Textarea id="blogContent" name="content" value={blogPostForm.content} onChange={handleBlogPostFormChange} required rows={8} placeholder="Paragraphs separated by blank lines." disabled={isSubmittingBlogPost} /><p className="text-xs text-gray-500 mt-1">Tip: Separate paragraphs with a blank line.</p></div>
            <div className="md:col-span-2"><Label htmlFor="blogFeaturedImage">Featured Image {editingBlogPost ? '(Optional if not changing)' : '*'}</Label><div className="mt-1 flex items-center gap-4">{blogImagePreview ? (<div className="relative group"><img src={blogImagePreview} alt="Blog preview" className="h-20 w-32 rounded-md object-cover border p-1" /><Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeBlogPostImage(!!editingBlogPost)}><Trash2 className="h-3 w-3" /></Button></div>) : (<div className="h-20 w-32 rounded-md border-dashed border-2 flex flex-col items-center justify-center bg-gray-50 text-gray-400"><ImagePlus className="h-8 w-8" /><span className="text-xs mt-1">Upload</span></div>)}<Input id="blogFeaturedImage" name="featuredImageFile" type="file" accept="image/*" onChange={handleBlogImageChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" disabled={isSubmittingBlogPost} required={!editingBlogPost && !blogImagePreview} /><p className="text-xs text-gray-500 mt-1">Max 2MB. {editingBlogPost ? 'Upload new to replace.' : 'Required.'}</p></div></div>
            <div className="md:col-span-2"><Label htmlFor="blogTags">Tags (comma-separated)</Label><Input id="blogTags" name="tags" value={blogPostForm.tags} onChange={handleBlogPostFormChange} placeholder="e.g., AI, HR Tech" disabled={isSubmittingBlogPost} /></div>
            <div className="md:col-span-2 flex items-center space-x-2 pt-2"><Checkbox id="isPublished" checked={blogPostForm.isPublished} onCheckedChange={handleNewBlogPostCheckboxChange} disabled={isSubmittingBlogPost} /><Label htmlFor="isPublished" className="cursor-pointer select-none">Publish immediately</Label></div>
          </div>
          <div><Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmittingBlogPost || isLoadingBlogCategoriesForDropdown}>{isSubmittingBlogPost && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editingBlogPost ? 'Update Post' : 'Add Post'}</Button></div>
        </form>
      )}
    </motion.div>
  );
  const renderManageBlogPostsSection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b"><h2 className="text-2xl font-semibold text-gray-700">Manage Blog Posts</h2><Button onClick={() => { resetAndCloseBlogPostForm(); setActiveSection('blog-post'); setShowBlogPostForm(true); }}> <PlusCircle size={18} className="mr-2" /> Add New Post</Button></div>
      {isLoadingAllBlogPosts ? <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin text-purple-600" /></div> : !allBlogPosts || allBlogPosts.length === 0 ? <p className="text-center text-gray-500 py-5">No blog posts found.</p> : (
        <div className="overflow-x-auto">
          <Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{allBlogPosts.map(post => (<TableRow key={post._id}><TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell><TableCell className="max-w-[150px] truncate">{typeof post.category === 'object' ? post.category.name : post.category}</TableCell><TableCell>{post.author}</TableCell><TableCell><span className={`px-2 py-1 text-xs rounded-full ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{post.isPublished ? 'Published' : 'Draft'}</span></TableCell><TableCell className="text-right space-x-2"><Button variant="outline" size="sm" onClick={() => handleEditBlogPost(post._id)}><Edit size={16} className="mr-1" /> Edit</Button><Button variant="destructive" size="sm" onClick={() => handleDeleteBlogPost(post._id)}><Trash2 size={16} className="mr-1" /> Delete</Button></TableCell></TableRow>))}</TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
  const renderManageApplicationsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 sm:mb-0">Manage Job Applications</h2>
        <div>
          <Label htmlFor="statusFilter" className="mr-2 text-sm">Filter by Status:</Label>
          <Select value={applicationStatusFilter} onValueChange={setApplicationStatusFilter}>
            <SelectTrigger id="statusFilter" className="w-full sm:w-[180px] text-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {applicationStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoadingAllApplications ? (
        <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
      ) : !allApplications || allApplications.length === 0 ? (
        <p className="text-center text-gray-500 py-5">
          {applicationStatusFilter === "All" ? "No applications found." : `No applications found with status "${applicationStatusFilter}".`}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {allApplications.map(app => (
                <TableRow key={app._id}>
                  <TableCell className="font-medium max-w-[150px] truncate">{app.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate"><a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">{app.email}</a></TableCell>
                  <TableCell className="max-w-[200px] truncate">{app.jobTitle}</TableCell>
                  <TableCell>{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      app.status === 'Hired' ? 'default' :
                        app.status === 'Contacted' || app.status === 'In Progress' ? 'secondary' :
                          app.status === 'Rejected' ? 'destructive' :
                            'outline'
                    } className="capitalize text-xs px-2 py-0.5">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1 sm:space-x-2">
                    <Button variant="ghost" size="sm" className="px-2 py-1 h-auto text-blue-600 hover:text-blue-700" onClick={() => handleOpenAppResponseModal(app)}>
                      <Eye size={14} className="mr-1 sm:mr-1.5" /> View/Respond
                    </Button>
                    {app.resume?.url && (
                      <Button asChild variant="outline" size="sm" className="px-2 py-1 h-auto">
                        <a href={app.resume.url} target="_blank" rel="noopener noreferrer">
                          <FileText size={14} className="mr-1 sm:mr-1.5" /> Resume
                        </a>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );

  const renderManageContactSubmissionsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-0 flex items-center">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-cyan-600" /> Contact Form Inbox
        </h2>

        <div>
          <Label htmlFor="contactStatusFilter" className="mr-2 text-xs sm:text-sm">Filter by Status:</Label>
          <Select value={contactStatusFilter} onValueChange={setContactStatusFilter}>
            <SelectTrigger id="contactStatusFilter" className="w-full sm:w-[180px] text-xs sm:text-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              {contactSubmissionStatuses.map(status => (
                <SelectItem key={status} value={status} className="capitalize">{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoadingContactSubmissions ? (
        <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin text-cyan-600" /></div>
      ) : !allContactSubmissions || allContactSubmissions.length === 0 ? (
        <p className="text-center text-gray-500 py-5">
          {contactStatusFilter === "All" ? "No contact submissions found." : `No submissions found with status "${contactStatusFilter}".`}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="w-[20%] min-w-[150px]">Submitter</TableHead>
              <TableHead className="w-[30%] min-w-[200px]">Message Preview</TableHead>
              <TableHead className="w-[15%] min-w-[100px]">Submitted</TableHead>
              <TableHead className="w-[15%] min-w-[120px]">Status</TableHead>
              <TableHead className="text-right w-[20%] min-w-[180px]">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {allContactSubmissions.map(sub => (
                <TableRow key={sub._id} className={`${sub.status === 'New' ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'} transition-colors`}>
                  <TableCell className="py-3">
                    <div className="font-medium text-sm text-gray-800 truncate" title={sub.yourName}>{sub.yourName}</div>
                    <a href={`mailto:${sub.yourEmail}`} className="text-xs text-blue-600 hover:underline truncate block" title={sub.yourEmail}>{sub.yourEmail}</a>
                    <div className="text-xs text-gray-500 truncate" title={sub.fullPhoneNumber}>{sub.fullPhoneNumber}</div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-sm md:max-w-md truncate py-3" title={sub.yourMessage}>{sub.yourMessage}</TableCell>
                  <TableCell className="text-xs text-gray-500 py-3">{new Date(sub.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="py-3">
                    <Select
                      value={sub.status}
                      onValueChange={(newStatus) => updateContactSubmissionStatus(sub._id, newStatus as ContactSubmission['status'], sub.adminNotes)}
                    >
                      <SelectTrigger className="h-8 text-xs w-full max-w-[100px] sm:max-w-[120px] capitalize">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {contactSubmissionStatuses.map(s => (
                          <SelectItem key={s} value={s} className="capitalize text-xs">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right space-x-1 py-3">
                    <Button variant="ghost" size="sm" className="px-1.5 py-1 h-auto text-cyan-600 hover:text-cyan-700" onClick={() => handleOpenContactResponseModal(sub)}>
                      <Eye size={14} className="mr-1" /> <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="px-1.5 py-1 h-auto text-gray-500 hover:text-gray-700" onClick={() => handleEditNotes(sub)}>
                      <Edit2 size={14} className="mr-1" /> <span className="hidden sm:inline">Notes</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteContactSubmission(sub._id)}>
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );

  const renderManageSubscriptionsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-0 flex items-center">
          <BellRing className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-orange-600" /> Manage Email Subscribers
        </h2>
      </div>
      {isLoadingAllSubscriptions ? (
        <div className="flex justify-center items-center p-10"><Loader2 className="h-8 w-8 animate-spin text-orange-600" /></div>
      ) : !allSubscriptions || allSubscriptions.length === 0 ? (
        <p className="text-center text-gray-500 py-5">No email subscriptions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">Email Address</TableHead>
                <TableHead>Subscribed On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allSubscriptions.map(sub => (
                <TableRow key={sub._id}>
                  <TableCell className="font-medium text-gray-800">
                    <a href={`mailto:${sub.email}`} className="hover:underline">{sub.email}</a>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteSubscription(sub._id)}>
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Toaster richColors position="top-center" duration={3000} />

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteAction?.itemType || "item"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel onClick={() => { setDeleteAction(null); setShowDeleteConfirm(false); }} className="w-full sm:w-auto transition-colors">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteAction) deleteAction.onConfirm(); setShowDeleteConfirm(false); }} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 transition-colors">Yes, delete it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isAppResponseModalOpen} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsAppResponseModalOpen(false);
          setSelectedApplicationForView(null);
          setAppAdminResponseForm({ subject: '', body: '' });
        } else {
          setIsAppResponseModalOpen(true);
        }
      }}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Respond to Application</DialogTitle>
            {selectedApplicationForView && (
              <DialogDescription className="text-sm">
                Applicant: <span className="font-medium text-gray-700">{selectedApplicationForView.name}</span> ({selectedApplicationForView.email}) <br />
                For: <span className="font-medium text-gray-700">{selectedApplicationForView.jobTitle}</span> at {selectedApplicationForView.companyName}
              </DialogDescription>
            )}
          </DialogHeader>
          {selectedApplicationForView && (
            <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {selectedApplicationForView.coverLetter && (
                <div className="p-3 bg-gray-50 rounded-md border">
                  <h4 className="font-semibold text-sm mb-1 text-gray-700">Cover Letter:</h4>
                  <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap">{selectedApplicationForView.coverLetter}</p>
                </div>
              )}
              {selectedApplicationForView.resume?.url && (
                <a href={selectedApplicationForView.resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  <ExternalLink size={14} className="mr-1.5" /> View Uploaded Resume
                </a>
              )}
              <form onSubmit={handleSendAppAdminResponse} className="space-y-4 pt-4 border-t">
                <div>
                  <Label htmlFor="appAdminResponseSubject" className="text-sm font-medium text-gray-700">Email Subject</Label>
                  <Input
                    id="appAdminResponseSubject" name="subject"
                    value={appAdminResponseForm.subject}
                    onChange={handleAppAdminResponseFormChange}
                    className="mt-1 text-sm" required disabled={isSendingAppResponse}
                  />
                </div>
                <div>
                  <Label htmlFor="appAdminResponseBody" className="text-sm font-medium text-gray-700">Response Message</Label>
                  <Textarea
                    id="appAdminResponseBody" name="body"
                    value={appAdminResponseForm.body}
                    onChange={handleAppAdminResponseFormChange}
                    className="mt-1 text-sm min-h-[150px]" rows={6} required disabled={isSendingAppResponse}
                    placeholder="Compose your response to the applicant here..."
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsAppResponseModalOpen(false)} disabled={isSendingAppResponse}>Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSendingAppResponse}>
                    {isSendingAppResponse && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Response
                  </Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isContactMsgResponseModalOpen} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsContactMsgResponseModalOpen(false);
          setSelectedContactSubmissionForView(null);
          setContactMsgAdminResponseForm({ subject: '', body: '' });
          setEditingSubmissionNotes(null);
        } else {
          setIsContactMsgResponseModalOpen(true);
        }
      }}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl bg-white max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">View & Respond to Message</DialogTitle>
            {selectedContactSubmissionForView && (
              <DialogDescription className="text-xs sm:text-sm">
                From: <span className="font-medium text-gray-700">{selectedContactSubmissionForView.yourName}</span> (<a href={`mailto:${selectedContactSubmissionForView.yourEmail}`} className="text-blue-600 hover:underline">{selectedContactSubmissionForView.yourEmail}</a>)<br />
                Phone: <span className="font-medium text-gray-700">{selectedContactSubmissionForView.fullPhoneNumber}</span> |
                Received: <span className="font-medium text-gray-700">{new Date(selectedContactSubmissionForView.submittedAt).toLocaleString()}</span>
              </DialogDescription>
            )}
          </DialogHeader>
          {selectedContactSubmissionForView && (
            <div className="flex-grow overflow-y-auto py-2 pr-1 sm:pr-2 space-y-4">
              <div className="p-3 bg-gray-50 rounded-md border">
                <h4 className="font-semibold text-sm mb-1 text-gray-700">Original Message:</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedContactSubmissionForView.yourMessage}</p>
              </div>
              {editingSubmissionNotes && editingSubmissionNotes.id === selectedContactSubmissionForView._id ? (
                <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <Label htmlFor="adminNotesEdit" className="text-sm font-medium text-yellow-700">Admin Notes (editing)</Label>
                  <Textarea
                    id="adminNotesEdit"
                    value={editingSubmissionNotes.notes}
                    onChange={(e) => setEditingSubmissionNotes(prev => prev ? { ...prev, notes: e.target.value } : null)}
                    className="mt-1 text-sm min-h-[60px] bg-white"
                    rows={3}
                    placeholder="Add internal notes..."
                  />
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" onClick={handleSaveNotes} disabled={isUpdatingNotes} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      {isUpdatingNotes ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <CheckCircle size={16} className="mr-1" />}
                      Save Notes
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingSubmissionNotes(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-md border relative group">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm mb-1 text-gray-700">Admin Notes:</h4>
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-30 group-hover:opacity-100 transition-opacity" onClick={() => handleEditNotes(selectedContactSubmissionForView)}>
                      <Pencil size={14} />
                    </Button>
                  </div>
                  <p className={`text-sm ${selectedContactSubmissionForView.adminNotes ? 'text-gray-600' : 'text-gray-400'} whitespace-pre-wrap`}>
                    {selectedContactSubmissionForView.adminNotes || "No notes added yet."}
                  </p>
                </div>
              )}

              <form onSubmit={handleSendContactMsgAdminResponse} className="space-y-3 pt-3 border-t">
                <div>
                  <Label htmlFor="contactMsgResponseSubject" className="text-sm font-medium text-gray-700">Your Email Subject</Label>
                  <Input
                    id="contactMsgResponseSubject" name="subject"
                    value={contactMsgAdminResponseForm.subject}
                    onChange={handleContactMsgAdminResponseFormChange}
                    className="mt-1 text-sm" required disabled={isSendingContactMsgResponse}
                  />
                </div>
                <div>
                  <Label htmlFor="contactMsgResponseBody" className="text-sm font-medium text-gray-700">Your Response Message</Label>
                  <Textarea
                    id="contactMsgResponseBody" name="body"
                    value={contactMsgAdminResponseForm.body}
                    onChange={handleContactMsgAdminResponseFormChange}
                    className="mt-1 text-sm min-h-[120px]" rows={5} required disabled={isSendingContactMsgResponse}
                    placeholder="Compose your response to the user here..."
                  />
                </div>
                <DialogFooter className="pt-1">
                  <Button type="button" variant="outline" onClick={() => setIsContactMsgResponseModalOpen(false)} disabled={isSendingContactMsgResponse}>Cancel</Button>
                  <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700" disabled={isSendingContactMsgResponse}>
                    {isSendingContactMsgResponse && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <SendHorizonal size={16} className="mr-2" /> Send Response
                  </Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10 p-3 sm:p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="hover:bg-gray-100 transition-colors"><Menu className="h-5 w-5 sm:h-6 sm:w-6" /></Button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">Admin Dashboard</h1><div className="w-10"></div>
      </div>

      {renderSidebar()}

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-60 sm:lg:ml-64' : 'lg:ml-0'}`}>
        <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 pt-16 sm:pt-20 lg:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex justify-between items-center mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + (showVacancyForm ? '-vf' : '') + (showBlogCategoryForm ? '-bcf' : '') + (showBlogPostForm ? '-bpf' : '')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {activeSection === 'contact' && renderContactSection()}
              {(activeSection === 'vacancy' || (showVacancyForm && activeSection !== 'manage-vacancies')) && renderVacancyFormSection()}
              {(activeSection === 'manage-vacancies' && !showVacancyForm) && renderManageVacanciesSection()}
              {(activeSection === 'manage-applications') && renderManageApplicationsSection()}
              {(activeSection === 'blog-category' || (showBlogCategoryForm && activeSection !== 'manage-blog-categories')) && renderBlogCategoryFormSection()}
              {(activeSection === 'manage-blog-categories' && !showBlogCategoryForm) && renderManageBlogCategoriesSection()}
              {(activeSection === 'blog-post' || (showBlogPostForm && activeSection !== 'manage-blog-posts')) && renderBlogPostFormSection()}
              {(activeSection === 'manage-blog-posts' && !showBlogPostForm) && renderManageBlogPostsSection()}
              {activeSection === 'manage-contact-submissions' && renderManageContactSubmissionsSection()}
              {activeSection === 'manage-subscriptions' && renderManageSubscriptionsSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
export default AdminDashboardPage;