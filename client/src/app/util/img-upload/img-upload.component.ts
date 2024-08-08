import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';
@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrl: './img-upload.component.css'
})
export class ImgUploadComponent {

  title = 'img_upload';

  constructor(private ImageUploadService: ImageUploadService) { }

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.ImageUploadService.uploadImage(file).subscribe({
        next: (response) => {
          console.log(response)
          this.imageUrl = response.profile_url;
          localStorage.setItem('uploadedImage', response.profile_url);
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    }
  }

  ngOnInit(): void {
    this.imageUrl = localStorage.getItem('uploadedImage');
  }

}
