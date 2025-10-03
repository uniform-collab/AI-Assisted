import { ComponentProps, registerUniformComponent } from "@uniformdev/canvas-react";
import { useUniformContext } from "@uniformdev/context-react";
import { useMemo } from "react";

type PersonalizedBannerProps = ComponentProps<{}>;

function PersonalizedBanner(props: PersonalizedBannerProps) {
  const { context } = useUniformContext();
  
  // Get current enrichment scores
  const scores = context?.scores || {};
  
  // Determine the primary audience segment based on scores
  const primarySegment = useMemo(() => {
    const audienceScore = scores['ce3586be-d714-42e6-a201-dfdbd0270ed5'] || 0;
    const interestScore = scores['2a729d76-0a0d-4b64-b6a5-3f66711c9caf'] || 0;
    const shopperScore = scores['4af66be8-8e5e-4c91-b09b-68edeeebba86'] || 0;
    
    // Determine content based on highest scoring enrichment
    if (interestScore > audienceScore && interestScore > shopperScore) {
      if (interestScore > 30) {
        return {
          title: "🌿 Discover Your Next Adventure",
          subtitle: "Based on your interests, we've found perfect eco-adventures for you",
          cta: "Explore Personalized Tours",
          bgColor: "from-green-500 to-emerald-600",
          icon: "🏔️"
        };
      }
    }
    
    if (audienceScore > 20) {
      return {
        title: "🌍 Welcome Back, Eco Explorer!",
        subtitle: "New sustainable destinations await your discovery",
        cta: "View Recommended Destinations",
        bgColor: "from-blue-500 to-green-500",
        icon: "🌱"
      };
    }
    
    if (shopperScore > 10) {
      return {
        title: "🎯 Special Offers Just for You",
        subtitle: "Exclusive deals on eco-friendly travel experiences",
        cta: "See Your Offers",
        bgColor: "from-purple-500 to-pink-500",
        icon: "✨"
      };
    }
    
    // Default content
    return {
      title: "🌿 Welcome to EcoQuest",
      subtitle: "Discover sustainable travel adventures that make a difference",
      cta: "Start Your Journey",
      bgColor: "from-green-400 to-blue-500",
      icon: "🌍"
    };
  }, [scores]);
  
  return (
    <div className={`bg-gradient-to-r ${primarySegment.bgColor} text-white py-12 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">{primarySegment.icon}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {primarySegment.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {primarySegment.subtitle}
        </p>
        <button className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
          {primarySegment.cta}
        </button>
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-black bg-opacity-20 rounded-lg text-sm">
            <p className="font-semibold mb-2">Debug - Enrichment Scores:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-left">
              <div>Audience: {(scores['ce3586be-d714-42e6-a201-dfdbd0270ed5'] || 0).toFixed(1)}</div>
              <div>Interest: {(scores['2a729d76-0a0d-4b64-b6a5-3f66711c9caf'] || 0).toFixed(1)}</div>
              <div>Shopper: {(scores['4af66be8-8e5e-4c91-b09b-68edeeebba86'] || 0).toFixed(1)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

registerUniformComponent({
  type: "personalizedBanner",
  component: PersonalizedBanner,
});

export default PersonalizedBanner;
