"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

// Wrapper Client Component pour Accordion
// Permet l'utilisation dans des Server Components tout en préservant l'interactivité
export {
  Accordion as AccordionClient,
  AccordionContent as AccordionContentClient,
  AccordionItem as AccordionItemClient,
  AccordionTrigger as AccordionTriggerClient
}