export const vert = `
   attribute vec4 a_position;
   attribute vec3 a_normal;

   uniform vec3 u_lightWorldPosition;
   uniform vec3 u_viewWorldPosition;

   uniform mat4 u_world;
   uniform mat4 u_worldViewProjection;
   uniform mat4 u_worldInverseTranspose;


   varying vec3 v_normal;
   varying vec3 v_surfaceToLight;
   varying vec3 v_surfaceToView;

   void main() {
      // Multiply the position by the matrix.
      gl_Position = u_worldViewProjection * a_position;

      // orient the normals and pass to the fragment shader
      v_normal = mat3(u_worldInverseTranspose) * a_normal;
      // v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;

      // compute the world position of the surface
      vec3 surfaceWorldPosition = (u_world * a_position).xyz;

      // compute the vector of the surface to the light
      // and pass it to the fragment shader
      v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

      // compute the vector of the surface to the view/camera
      // and pass it to the fragment shader
      v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
   }
`;

export const frag = `
   precision mediump float;

   varying vec3 v_normal;
   varying vec3 v_surfaceToLight;
   varying vec3 v_surfaceToView;

   uniform vec4 u_color;
   uniform float u_shininess;

   uniform vec3 u_lightDirection;
   uniform float u_innerLimit; 
   uniform float u_outerLimit;  

   void main() {

      // because v_normal is a varying it's interpolated
      // so it will not be a unit vector. Normalizing it
      // will make it a unit vector again

      vec3 normal = normalize(v_normal);

      vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
      vec3 surfaceToViewDirection = normalize(v_surfaceToView);
      vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);


      float dotFromDirection = dot(surfaceToLightDirection,-u_lightDirection);

      // if (dotFromDirection >= u_limit) {
      //    light = dot(normal, surfaceToLightDirection);
      //    if (light > 0.0) {
      //      specular = pow(dot(normal, halfVector), u_shininess);
      //    }
      // }

      // float limitRange = u_innerLimit - u_outerLimit;
      // float inLight = clamp((dotFromDirection - u_outerLimit) / limitRange, 0.0, 1.0);

      // float inLight = step(u_limit, dotFromDirection);

      //if limitRange is 0, divide by 0 undefined
      float inLight = smoothstep(u_outerLimit, u_innerLimit, dotFromDirection);

      float light = inLight * dot(normal, surfaceToLightDirection);
      float specular = inLight * pow(dot(normal, halfVector), u_shininess);


      gl_FragColor = u_color;

      // Lets multiply just the color portion (not the alpha)
      // by the light
      gl_FragColor.rgb *= light;

      // Just add in the specular
      gl_FragColor.rgb += specular;
   }
`;
