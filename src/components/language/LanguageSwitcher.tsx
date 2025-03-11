
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Globe size={16} />
          <span className="hidden md:inline">{language === 'en' ? 'English' : 'বাংলা'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <div className="flex items-center gap-2">
            <span>🇺🇸</span>
            <span>English</span>
            {language === 'en' && <span className="ml-2">✓</span>}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn')}>
          <div className="flex items-center gap-2">
            <span>🇧🇩</span>
            <span>বাংলা</span>
            {language === 'bn' && <span className="ml-2">✓</span>}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
