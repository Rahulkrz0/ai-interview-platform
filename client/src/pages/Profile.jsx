import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { User, Phone, BookOpen, Award, Link2, Upload, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    branch: '',
    graduationYear: '',
    skills: '',
    dreamRole: '',
    experience: 'Entry level',
    linkedinUrl: '',
    githubUrl: '',
  });

  const [photo, setPhoto] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Prefill user details
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        college: user.college || '',
        degree: user.degree || '',
        branch: user.branch || '',
        graduationYear: user.graduationYear || '',
        skills: user.skills ? user.skills.join(', ') : '',
        dreamRole: user.dreamRole || '',
        experience: user.experience || 'Entry level',
        linkedinUrl: user.linkedinUrl || '',
        githubUrl: user.githubUrl || '',
      });
      setPhoto(user.photo || '');
      setPhotoPreview(user.photo || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are supported.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image file size must be under 2MB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Base64
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    // Parse comma-separated skills
    const parsedSkills = formData.skills
      ? formData.skills.split(',').map((s) => s.trim()).filter((s) => s !== '')
      : [];

    const payload = {
      name: formData.name,
      phone: formData.phone,
      college: formData.college,
      degree: formData.degree,
      branch: formData.branch,
      graduationYear: formData.graduationYear ? Number(formData.graduationYear) : null,
      skills: parsedSkills,
      dreamRole: formData.dreamRole,
      experience: formData.experience,
      linkedinUrl: formData.linkedinUrl,
      githubUrl: formData.githubUrl,
      photo: photo,
    };

    try {
      await updateUserProfile(payload);
      setSuccess('Profile configuration saved successfully.');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 text-slate-800 dark:text-slate-100">
      <div className="border-b border-slate-200/10 pb-4">
        <h1 className="text-2xl font-bold">Configure Profile</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your credentials, academic degrees, and placement targeting parameters.</p>
      </div>

      {success && (
        <div className="flex items-center space-x-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl text-xs">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2.5 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Avatar Upload */}
        <div className="md:col-span-1 space-y-6">
          <GlassCard className="text-center p-6 space-y-4 flex flex-col items-center justify-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Photo</h3>
            
            <div className="relative group">
              <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-slate-500/10 flex items-center justify-center">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-16 w-16 text-slate-400" />
                )}
              </div>
              <label className="absolute inset-0 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 text-[10px] font-bold uppercase">
                <Upload className="h-4 w-4 mr-1.5" />
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-bold">{formData.name || 'Anonymous Developer'}</p>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">{formData.email}</p>
            </div>
          </GlassCard>

          <GlassCard className="space-y-3 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Placement Target</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Role:</span>
                <span className="font-semibold text-indigo-500">{formData.dreamRole || 'Not Set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Experience:</span>
                <span className="font-semibold">{formData.experience}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Form Fields */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="space-y-6 p-6">
            
            {/* 1. Basic Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/10 pb-2">
                Personal details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Email Address (Read Only)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full bg-slate-500/5 border border-slate-500/10 text-slate-400 rounded-xl px-3 py-2.5 text-xs cursor-not-allowed"
                    disabled
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Preferred Role</label>
                  <input
                    type="text"
                    name="dreamRole"
                    value={formData.dreamRole}
                    onChange={handleInputChange}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Academics */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/10 pb-2">
                Academic Qualifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">College/University</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder="e.g. State Tech University"
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Graduation Year</label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    placeholder="2026"
                    className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="e.g. B.Tech, MS"
                    className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Major/Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    placeholder="e.g. Computer Science"
                    className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-slate-500/10 dark:bg-slate-900 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Entry level">Entry level</option>
                    <option value="Intermediate">Intermediate (1-3 yrs)</option>
                    <option value="Senior">Senior (3+ yrs)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Skills */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/10 pb-2">
                Technical Skills
              </h3>
              
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Skills (comma-separated)</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, JavaScript, Python, MongoDB"
                  rows="3"
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                ></textarea>
                
                {formData.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.skills.split(',').map((s) => s.trim()).filter((s) => s !== '').map((tag, idx) => (
                      <span key={idx} className="bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 4. Social Links */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/10 pb-2">
                Professional Social URLs
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">LinkedIn URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">GitHub URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username"
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-200/10" />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:opacity-95 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Profile Configuration...</span>
                </>
              ) : (
                <span>Save Profile Configuration</span>
              )}
            </button>

          </GlassCard>
        </div>

      </form>
    </div>
  );
};

export default Profile;
