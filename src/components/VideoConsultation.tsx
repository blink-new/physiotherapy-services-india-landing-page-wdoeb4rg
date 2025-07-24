import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Settings,
  Monitor,
  Users,
  Clock,
  Shield
} from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

interface VideoConsultationProps {
  consultationId: string
  patientName: string
  doctorName: string
  scheduledTime: string
  onEndConsultation: () => void
}

interface ChatMessage {
  id: string
  sender: 'patient' | 'doctor'
  message: string
  timestamp: Date
}

export function VideoConsultation({
  consultationId,
  patientName,
  doctorName,
  scheduledTime,
  onEndConsultation
}: VideoConsultationProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [consultationDuration, setConsultationDuration] = useState(0)
  
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  // Simulate video consultation connection
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true)
      setConnectionStatus('connected')
      toast({
        title: 'Connected Successfully',
        description: `You are now connected with Dr. ${doctorName}`,
      })
    }, 3000)

    return () => clearTimeout(connectTimer)
  }, [doctorName, toast])

  // Duration timer
  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setConsultationDuration(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isConnected])

  // Simulate getting user media
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        })
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing media devices:', error)
        toast({
          title: 'Camera/Microphone Access',
          description: 'Please allow camera and microphone access for video consultation',
          variant: 'destructive'
        })
      }
    }

    getUserMedia()
  }, [toast])

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast({
      title: isVideoOn ? 'Camera Off' : 'Camera On',
      description: isVideoOn ? 'Your camera is now off' : 'Your camera is now on',
    })
  }

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn)
    toast({
      title: isAudioOn ? 'Microphone Off' : 'Microphone On',
      description: isAudioOn ? 'Your microphone is now muted' : 'Your microphone is now unmuted',
    })
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'patient',
        message: newMessage,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'doctor',
          message: 'Thank you for sharing that information. I understand your concern.',
          timestamp: new Date()
        }
        setChatMessages(prev => [...prev, doctorResponse])
      }, 2000)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const endConsultation = () => {
    toast({
      title: 'Consultation Ended',
      description: `Session duration: ${formatDuration(consultationDuration)}`,
    })
    onEndConsultation()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold">Video Consultation</h1>
            <p className="text-gray-400">with Dr. {doctorName}</p>
          </div>
          <Badge variant={connectionStatus === 'connected' ? 'default' : 'secondary'}>
            {connectionStatus === 'connecting' && 'Connecting...'}
            {connectionStatus === 'connected' && 'Connected'}
            {connectionStatus === 'disconnected' && 'Disconnected'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            {formatDuration(consultationDuration)}
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className="flex-1 relative">
          {/* Remote Video (Doctor) */}
          <div className="w-full h-full bg-gray-800 relative">
            {connectionStatus === 'connecting' ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-lg">Connecting to Dr. {doctorName}...</p>
                  <p className="text-gray-400">Please wait while we establish the connection</p>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                />
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded">
                  <p className="text-sm">Dr. {doctorName}</p>
                </div>
              </>
            )}
          </div>

          {/* Local Video (Patient) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              className={`w-full h-full object-cover ${!isVideoOn ? 'hidden' : ''}`}
              autoPlay
              playsInline
              muted
            />
            {!isVideoOn && (
              <div className="flex items-center justify-center h-full">
                <VideoOff className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
              You
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button
              variant={isAudioOn ? "default" : "destructive"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={toggleAudio}
            >
              {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button
              variant={isVideoOn ? "default" : "destructive"}
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-12 h-12"
              onClick={endConsultation}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === 'patient'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-gray-700 border-gray-600"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}