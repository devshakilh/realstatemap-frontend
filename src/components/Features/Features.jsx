
import { Shield, Clock, BadgeCheck, HeartHandshake } from 'lucide-react';
import './Features.css'; // Import the custom CSS file

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "All transactions are protected with bank-level security and encryption"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated team is available round the clock to assist you"
  },
  {
    icon: BadgeCheck,
    title: "Verified Properties",
    description: "All listed properties are thoroughly verified by our expert team"
  },
  {
    icon: HeartHandshake,
    title: "Expert Guidance",
    description: "Get professional advice from our experienced real estate agents"
  }
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <div className="features-header">
          <h2>Why Choose Us</h2>
          <p>
            We provide the best service in the real estate industry with proven results
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-item">
                <div className="icon-wrapper">
                  <Icon className="h-8 w-8" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
