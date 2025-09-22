const Footer = () => {
  return (
    <footer className="bg-card/95 backdrop-blur-sm border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2024 Community Reports. Helping keep our city clean and safe.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Support
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;