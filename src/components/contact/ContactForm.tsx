
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    setTimeout(() => {
      toast.success("Votre message a été envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">Nom *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">E-mail *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre.email@exemple.com"
            className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-gray-700 font-medium">Sujet *</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Sujet de votre message"
          className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre demande en détail..."
          className="min-h-32 border-gray-200 focus:border-orange-400 focus:ring-orange-400 resize-none"
          required
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Envoi en cours...
            </>
          ) : (
            "Envoyer le message"
          )}
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        * Champs obligatoires. Nous vous répondrons dans les plus brefs délais.
      </p>
    </form>
  );
}
