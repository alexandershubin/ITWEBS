export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalFormData {
  text: string;
  file: File | null;
}

export interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  photoId: number;
}