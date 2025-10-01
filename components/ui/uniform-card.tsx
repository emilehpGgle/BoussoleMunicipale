import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface UniformCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large" | "auto"
  interactive?: boolean
  children: React.ReactNode
}

const sizeClasses = {
  small: "min-h-[200px]",
  medium: "min-h-[280px]",
  large: "min-h-[350px]",
  auto: ""
}

const UniformCard = React.forwardRef<HTMLDivElement, UniformCardProps>(
  ({ className, size = "medium", interactive = false, children, ...props }, ref) => {
    const cardClasses = cn(
      "h-full", // Assure que la carte prend toute la hauteur disponible
      sizeClasses[size],
      interactive && "transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
      className
    )

    return (
      <Card ref={ref} className={cardClasses} {...props}>
        <div className="flex flex-col h-full">
          {children}
        </div>
      </Card>
    )
  }
)

UniformCard.displayName = "UniformCard"

// Composants spécialisés pour différents types de cartes
const StepCard = React.forwardRef<HTMLDivElement, {
  step: number
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
}>(({ step, title, description, icon, className }, ref) => (
  <UniformCard
    ref={ref}
    size="small"
    interactive={true}
    className={cn("text-center", className)}
  >
    <CardContent className="p-6 space-y-4 flex flex-col justify-center items-center h-full">
      <div className="flex items-center justify-center">
        {icon ? (
          <div className="w-12 h-12 bg-midnight-green/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <div className="w-12 h-12 bg-midnight-green text-white rounded-full flex items-center justify-center text-xl font-bold">
            {step}
          </div>
        )}
      </div>
      <div className="space-y-2 flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-eerie-black">
          {step ? `${step}. ${title}` : title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </CardContent>
  </UniformCard>
))

StepCard.displayName = "StepCard"

const ServiceCard = React.forwardRef<HTMLDivElement, {
  icon: React.ReactNode
  title: string
  items: string[]
  className?: string
}>(({ icon, title, items, className }, ref) => (
  <UniformCard
    ref={ref}
    size="medium"
    className={cn("", className)}
  >
    <CardContent className="p-6 h-full">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 text-midnight-green flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="text-sm text-muted-foreground space-y-2 flex-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </CardContent>
  </UniformCard>
))

ServiceCard.displayName = "ServiceCard"

const FeatureCard = React.forwardRef<HTMLDivElement, {
  title: string
  description: string
  image?: string
  className?: string
  children?: React.ReactNode
}>(({ title, description, image, className, children }, ref) => (
  <UniformCard
    ref={ref}
    size="medium"
    interactive={true}
    className={cn("", className)}
  >
    <CardContent className="p-8 h-full">
      <div className="flex flex-col h-full space-y-4">
        {image && (
          <div className="flex items-center justify-center mb-4">
            <div className="w-full max-w-[200px] aspect-square rounded-xl overflow-hidden">
              <Image
                src={image}
                alt={title}
                width={200}
                height={200}
                className="w-full h-full object-cover"
                sizes="200px"
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center space-y-2">
          <h3 className="text-xl font-semibold text-center">{title}</h3>
          <p className="text-muted-foreground text-center leading-relaxed">{description}</p>
        </div>
        {children}
      </div>
    </CardContent>
  </UniformCard>
))

FeatureCard.displayName = "FeatureCard"

const StatCard = React.forwardRef<HTMLDivElement, {
  stat: string
  label: string
  description: string
  className?: string
}>(({ stat, label, description, className }, ref) => (
  <UniformCard
    ref={ref}
    size="medium"
    interactive={true}
    className={cn("bg-card rounded-xl shadow-soft card-interactive-effects hover:shadow-md transition-shadow duration-200", className)}
  >
    <CardContent className="p-8 text-center h-full flex flex-col justify-center space-y-3">
      <div className="text-4xl font-bold text-midnight-green">{stat}</div>
      <div className="text-lg font-semibold text-foreground">{label}</div>
      <div className="text-base text-muted-foreground leading-relaxed">{description}</div>
    </CardContent>
  </UniformCard>
))

StatCard.displayName = "StatCard"

const EngagementCard = React.forwardRef<HTMLDivElement, {
  title: string
  description: string
  className?: string
}>(({ title, description, className }, ref) => (
  <UniformCard
    ref={ref}
    size="small"
    className={cn("", className)}
  >
    <CardContent className="p-6 h-full">
      <h3 className="text-lg font-semibold mb-3 text-midnight-green">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </CardContent>
  </UniformCard>
))

EngagementCard.displayName = "EngagementCard"

export {
  UniformCard,
  StepCard,
  ServiceCard,
  FeatureCard,
  StatCard,
  EngagementCard,
  type UniformCardProps
}