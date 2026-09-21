# Texas Plumbers Premium Website

## Build
- Replace the placeholder with one cohesive, cinematic scrolling site using the supplied navy, black, ivory, silver, and copper palette.
- Create a floating responsive navigation with active-section tracking, smooth scrolling, scroll-state styling, and a full-screen mobile menu.
- Build the requested sections in order: hero, trust marquee, about, values, editable services, empty reel frame, service-area visualization and location cloud, credential banner, contact call-to-action, contact details, Facebook card, and footer.
- Use only supplied business facts. Keep service entries explicitly editable, leave the reel empty, and use intentional framed visual placeholders instead of invented company photography.

## Interaction and motion
- Add a reusable glossy button language with shine, lift, arrow motion, press feedback, and accessible focus states.
- Add varied reveal, parallax, floating, marquee, panel, chip, and edge-glow effects with reduced-motion support.
- Make all phone, email, Facebook, directions, section navigation, mobile-menu, and back-to-top actions functional.

## Responsive quality
- Compose desktop sections editorially and create purpose-built tablet/mobile arrangements rather than simple stacking.
- Prevent overflow and keep typography, buttons, location chips, contact details, and the 16:9 reel frame readable from 375px through wide desktop.

## Verification
- Check the full page at desktop and mobile sizes.
- Exercise navigation, mobile menu, scroll buttons, telephone/email/map/Facebook links, and back-to-top behavior.
- Confirm the reel remains a non-playing placeholder and no unsupported claims appear.

## Technical details
- Keep the existing TanStack Start structure and implement the experience at `/`.
- Define the visual system as semantic OKLCH tokens and reusable global utilities in the existing stylesheet.
- Use React state/effects plus CSS motion for scroll-aware interactions, with lightweight icons from the project’s available packages where possible.
- Add route-specific title, description, Open Graph, and Twitter metadata for the home page.
