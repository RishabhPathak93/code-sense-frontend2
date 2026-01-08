import { Card } from '@/components/atomic/card'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Upload, Github, Cloud } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/scan/start/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const options = [
    { 
      id: 'zip', 
      label: 'Upload Zip', 
      icon: Upload,
      description: 'Upload a compressed file',
      route: '/scan/start/uploadzip'
    },
    { 
      id: 'github', 
      label: 'GitHub', 
      icon: Github,
      description: 'Connect from GitHub',
      route: '/scan/start/githubrepo'
    },
    { 
      id: 'azure', 
      label: 'Azure DevOps', 
      icon: Cloud,
      description: 'Import from Azure',
      route: '/scan/start/azure'
    }
  ]

  const handleSelection = (route: string) => {
    if (route === '/scan/start/azure') {
      toast.warning("Not Implemented")
      return
    } 
    navigate({ to: route })
  }

  return (
    
      <div className="p-6 max-w-8xl mx-auto">
        <Card className="bg-white dark:bg-[#2d2d2d] text-[#2d2d2d] dark:text-[#e5e5e5] shadow-lg rounded-lg">
          <div className='px-52 py-20'>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">
            Connect Your Repository
          </h1>
          <p className="">
            Select a source and provide the details
          </p>
        </div>

        <div className="flex gap-4">
          {options.map((opt) => {
            const Icon = opt.icon
            return (
              <div
                key={opt.id}
                onClick={() => handleSelection(opt.route)}
                className="flex-1 p-8 text-center cursor-pointer rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 bg-white dark:bg-[#3a3a3a] dark:hover:bg-red-800/20 transition-all duration-200 hover:shadow-lg"
              >
                <Icon className="w-16 h-16 mx-auto mb-4  group-hover:text-red-500" />
                <p className="text-lg font-semibold  mb-2">
                  {opt.label}
                </p>
                <p className="text-sm text-gray-400">
                  {opt.description}
                </p>
              </div>
            )
          })}
        </div>
        </div>
        </Card>
      </div>
  )
}
 