import { render, screen } from '@testing-library/react';
import LoadingComponent from './LoadingComponent';

jest.mock('@heroui/react', () => ({
    Spinner: ({ label = 'Loading...', color = 'warning', labelColor = 'warning' }: { label?: string; color?: string; labelColor?: string }) => (
        <div
            data-testid="spinner"
            aria-label={label}
            data-color={color}
            data-label-color={labelColor}
        />
    ),
}));

describe('LoadingComponent component tests', () => {
    it('renders the Spinner component with correct props', () => {
        render(<LoadingComponent />);

        const spinner = screen.getByTestId('spinner');

        expect(spinner.getAttribute('aria-label')).toBe('Loading...');
        expect(spinner.getAttribute('data-color')).toBe('warning');
        expect(spinner.getAttribute('data-label-color')).toBe('warning');
    });
});