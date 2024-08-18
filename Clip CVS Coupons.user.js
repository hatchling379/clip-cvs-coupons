// ==UserScript==
// @name          Clip CVS Coupons
// @include       https://www.cvs.com/extracare/home*
// @description   Automatically send all CVS deals to card
// @version       2.0.0
// @namespace     hatchling379
// @license       MIT
// ==/UserScript==

// Timing constants
const WAIT_INTERVAL = 1000;
const SCROLL_INTERVAL = 100;
const CLICK_INTERVAL = 20;

// CSS Selectors
const COUPONS_CONTAINER = 'extracare-all-coupons';
const COUPON_COUNT = 'cpnCount';
const COUPON = 'cvs-coupon-container';
const SEND_TO_CARD = 'send-to-card-action > button';

// Main script function
async function clipCVSCoupons() {
  await waitForPageLoad();
  await scrollToShowCoupons();
  await sendAllCouponsToCard();
}

// Wait for the coupons container to appear
async function waitForPageLoad() {
  while (!document.querySelector(COUPONS_CONTAINER)) {
    await delay(WAIT_INTERVAL);
  }
}

// Scroll to load all coupons
async function scrollToShowCoupons() {
  const couponCountLabel = document.getElementById(COUPON_COUNT).textContent;
  const couponCount = parseInt(couponCountLabel.match(/(\d+)\s+coupons/)[1]);
  while (document.querySelectorAll(COUPON).length < couponCount) {
    const lastCoupon = document.querySelector(COUPON + ':last-of-type');
    lastCoupon.scrollIntoView({ block: 'center' });
    await delay(SCROLL_INTERVAL);
  }
}

// Click each "Send to card" button
async function sendAllCouponsToCard() {
  const sendButtons = document.querySelectorAll(SEND_TO_CARD);
  for (let i = sendButtons.length - 1; i >= 0; i--) {
    const sendButton = sendButtons[i];
    sendButton.closest(COUPON).scrollIntoView({ block: 'center' });
    sendButton.click();
    await delay(CLICK_INTERVAL);
  }
}

// Delay utility function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the coupon clipping process
clipCVSCoupons();