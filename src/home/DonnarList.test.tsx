---FILEPATH src/home/DonnarList.test.tsx
---FIND
```
```
---REPLACE
```
import React from 'react';
import { render, screen } from '@testing-library/react';
import DonnarList from './DonnarList';

describe('DonnarList Component', () => {
  test('renders without crashing', () => {
    render(<DonnarList />);
    const linkElement = screen.getByText(/donnar list/i);
    expect(linkElement).toBeInTheDocument();
  });

  // Add more test cases as needed
});
```
---COMPLETE