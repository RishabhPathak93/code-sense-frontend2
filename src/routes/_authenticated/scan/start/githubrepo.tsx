import { Card, CardHeader, CardTitle } from '@/components/atomic/card';
import { Input } from '@/components/atomic/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atomic/select';
import { useProjectNames } from '@/hooks/use-project';
import { useCreateGithubScan } from '@/hooks/use-scans';
import type { CreateGithubScans } from '@/types/scan';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Play, } from 'lucide-react';
import React, { useState } from 'react'
 
export const Route = createFileRoute('/_authenticated/scan/start/githubrepo')({
  component: RouteComponent,
})
 
function RouteComponent() {
 
  const navigate = useNavigate()
    const createScanMutation = useCreateGithubScan();
    const [formData, setFormData] = useState<CreateGithubScans>({
      scan_name: '',
      project_id: '',
      git_token: '',
      git_repo: '',
      git_rowner: '',
    });
 
    const {data: projects =[] } = useProjectNames()
    const [errors, setErrors] = useState<Partial<CreateGithubScans>>({});
 
    const handleSelectChange = (value: string) => {
      setFormData(prev => ({
        ...prev,
        project_id: value,
      }));
      if (errors.project_id) {
        setErrors(prev => ({
          ...prev,
          project_id: undefined,
        }));
      }
    };
 
     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof CreateGithubScans]) {
          setErrors(prev => ({ ...prev, [name]: undefined }));
        }
      };
     
        const validateForm = (): boolean => {
          const newErrors: Partial<CreateGithubScans> = {};
          if (!formData.project_id.trim()) newErrors.project_id = 'Project selection is required';
          if (!formData.scan_name.trim()) newErrors.scan_name = 'Scan name is required';
          if (!formData.git_repo.trim()) newErrors.git_repo = 'GitHub Repository is required';
          if (!formData.git_token.trim()) newErrors.git_token = 'GitHub Token is required';
          if (!formData.git_rowner.trim()) newErrors.git_rowner = 'GitHub Repository Owner is required';
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };
     
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
            if (validateForm()) {
              const scanData = {
                scan_name: formData.scan_name,
                project_id: formData.project_id,
                git_token: formData.git_token,
                git_repo: formData.git_repo,
                git_rowner: formData.git_rowner,
              }
              console.log('Form submitted:', scanData);
             
              await createScanMutation.mutateAsync(scanData);
            }
     
            setFormData({
              scan_name: '',
              project_id: '',
              git_token: '',
              git_repo: '',
              git_rowner: '',
            })
     
            navigate({ from: '/scan/start', to: `../../project/${formData.project_id}` });
          } catch (error) {
            console.error('Error creating user:', error);
          }
         
        };
 
 
  return (
  <>
  <div className="p-6 max-w-8xl mx-auto">
        <Card className="bg-white dark:bg-[#2d2d2d] text-[#2d2d2d] dark:text-[#e5e5e5] shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className='text-2xl'>Start Scan by GitHub</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-6 px-6 pt-0">
            <div>
              <label className='block font-medium text-sm mb-1'>Select Project</label>
              <Select value={formData.project_id} onValueChange={handleSelectChange}>
                <SelectTrigger className={`w-full p-3 rounded bg-white dark:bg-[#2d2d2d] text-[#2d2d2d] dark:text-[#e5e5e5]
                  ${errors.project_id ? 'border-red-500 bg-red-50 dark:bg-[#3b1c1c]' : 'border border-gray-300 dark:border-gray-200/20'}`}
                >
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent className='bg-white dark:bg-[#2d2d2d] text-[#2d2d2d] dark:text-[#e5e5e5]'>
                  {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project_id && (
                <p className="text-sm text-red-600 mt-1">{errors.project_id}</p>
              )}
            </div>
 
            {/* scan Name input */}
            <div>
              <label className="block font-medium text-sm mb-1"> Scan Name</label>
              <Input
                name="scan_name"
                value={formData.scan_name}
                onChange={handleInputChange}
                className={`${errors.scan_name && 'border-red-500 bg-red-50 dark:bg-[#3b1c1c]'}`}
                placeholder="Enter scan name"
              />
              {errors.scan_name && <p className="text-sm text-red-600 mt-1">{errors.scan_name}</p>}
            </div>
 
            <div>
              <label className="block font-medium text-sm mb-1">GitHub Token</label>
              <Input
                name="git_token"
                value={formData.git_token}
                onChange={handleInputChange}
                className={`${errors.git_token && 'border-red-500 bg-red-50 dark:bg-[#3b1c1c]'}`}
                placeholder="Enter GitHub Token"
              />
              {errors.git_token && <p className="text-sm text-red-600 mt-1">{errors.git_token}</p>}
            </div>
 
            <div>
              <label className="block font-medium text-sm mb-1">Repository Owner</label>
              <Input
                name="git_rowner"
                value={formData.git_rowner}
                onChange={handleInputChange}
                className={`${errors.git_rowner && 'border-red-500 bg-red-50 dark:bg-[#3b1c1c]'}`}
                placeholder="Enter username of Github"
              />
              {errors.git_rowner && <p className="text-sm text-red-600 mt-1">{errors.git_rowner}</p>}
            </div>
 
            <div>
              <label className="block font-medium text-sm mb-1"> Git Repository</label>
              <Input
                name="git_repo"
                value={formData.git_repo}
                onChange={handleInputChange}
                className={`${errors.git_repo && 'border-red-500 bg-red-50 dark:bg-[#3b1c1c]'}`}
                placeholder="Enter the repository name"
              />
              {errors.git_repo && <p className="text-sm text-red-600 mt-1">{errors.git_repo}</p>}
            </div>
 
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#bf0000] hover:bg-red-800 text-white font-semibold py-3 rounded shadow"
            >
              <div className="flex items-center justify-center gap-2">
                <Play size={16} />
                Start Scan
              </div>
            </button>
          </div>
 
          </form>
        </Card>
    </div>
  </>
);
}
 