import './style.css';
import {
  gamingCard,
  healthcareCard,
  learningCard,
  paymentCard,
  pricingCard,
  sortingCard,
} from './ui/cards';
import { mountStrategyCard } from './ui/strategy-card';

const app = document.getElementById('app');
if (!app) throw new Error('Missing <main id="app"> in index.html.');

mountStrategyCard(app, paymentCard);
mountStrategyCard(app, pricingCard);
mountStrategyCard(app, sortingCard);
mountStrategyCard(app, learningCard);
mountStrategyCard(app, gamingCard);
mountStrategyCard(app, healthcareCard);
