import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AiServiceService {
  generateFortune(prompt: string): Observable<{ response: string }> {
    console.log(`prompt not implemented: ${prompt}`);

    return of({ response: 'No fortune available' });
  }
}
