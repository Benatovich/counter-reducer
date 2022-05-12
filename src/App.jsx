import Counter from './components/Counter/Counter';
import { CounterProvider } from './context/CounterProvider';

export default function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
