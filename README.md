# Genesis Wallet Demo

An interactive mockup of the Genesis Wallet user interface built as a static site for GitHub Pages. It simulates a cryptocurrency portfolio with sample token balances and provides modal interactions for receiving, sending and swapping tokens. The demo is powered by the T Gen AI engine.

## Features

- Display of portfolio balance and sample tokens (Solana, USD Coin and Raydium) with amounts.
- Clicking a token opens a modal with actions: Receive, Send and Swap, accompanied by sound effects.
- The Receive action shows a dummy receiving address and QR code.
- The Send and Swap actions present input fields for recipient addresses and amounts and a confirm button that triggers a simulated transaction confirmation.
- Responsive and stylized UI with a radial gradient background, neon colours and subtle animations.

## Project Structure

- **index.html** – contains the main markup for the wallet interface, token list, modal and footer disclaimer.
- **script.js** – implements JavaScript logic for UI interactions, audio playback, modal management and simulated transactions.
- **style.css** – defines fonts, layout, token cards, modal styling, buttons and animations.
- **genesis-logo.png** – the wallet logo image.

## Usage

Clone the repository and open `index.html` in a modern web browser. Click on a token card to open the modal and interact with the available wallet actions. The demo uses static dummy data and does not perform real blockchain transactions.

## Disclaimer

This is a demonstration environment. The UI and token data are simulated for demonstration purposes and may not reflect final production features. Use it purely for previewing the Genesis Wallet interface.

## Deployment

The project requires no build steps and can be deployed via GitHub Pages or any static hosting service. Simply serve the files in the repository.
