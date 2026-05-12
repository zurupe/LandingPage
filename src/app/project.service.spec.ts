import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = injectService();
  });

  function injectService() {
    return TestBed.inject(ProjectService);
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return projects list', () => {
    const projects = service.projects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBeDefined();
  });

  it('should return correct project count', () => {
    const count = service.projectCount;
    expect(count).toBe(service.projects().length);
  });
});
